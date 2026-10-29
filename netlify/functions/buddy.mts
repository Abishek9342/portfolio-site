import Anthropic from '@anthropic-ai/sdk';
import { getStore } from '@netlify/blobs';
import { datasets, experience, profile, publications, skillGroups, whatsappUrl } from '../../src/data/content';

// Buddy's AI fallback: the browser POSTs the conversation to /api/buddy only for questions the
// built-in FAQ (src/data/faq.ts) can't answer; the reply streams back as plain text.
// The Anthropic key comes from Netlify's AI Gateway (ANTHROPIC_API_KEY / ANTHROPIC_BASE_URL are
// injected automatically) and usage is billed to the Netlify account's credits, so it is capped twice:
// per visitor by Netlify's rate limit (config below) and site-wide by DAILY_LIMIT.

const MODEL = 'claude-opus-5-5';
const MAX_TURNS = 12;
const MAX_CHARS = 1000;
const DAILY_LIMIT = 150; // AI answers per UTC day across all visitors

export const config = {
  path: '/api/buddy',
  rateLimit: { windowLimit: 6, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

const strip = (s: string) => s.replace(/\*\*/g, '');

const CONTACT = `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}\nWhatsApp: ${whatsappUrl}`;

// Everything Buddy knows comes from the same content file the site renders.
const PROFILE = [
  `Name: ${profile.name}. Role: ${profile.role}.`,
  `GitHub: ${profile.github}. Kaggle: ${profile.kaggle}. Resume: available via the "Download resume" button at the top of the page.`,
  'Education: B.Tech in Artificial Intelligence and Data Science, Mepco Schlenk Engineering College (Oct 2021 - Apr 2025).',
  '',
  'CONTACT (always share all three lines exactly like this, each on its own line)',
  CONTACT,
  '',
  'EXPERIENCE',
  ...experience.flatMap((job) => [
    `${job.company}, ${job.role} (${job.dates})`,
    ...job.projects.map((p) => `- ${p.title} [${p.tags.join(', ')}]: ${strip(p.description)}`),
  ]),
  '',
  'SKILLS',
  ...skillGroups.map((g) => `- ${g.label}: ${g.items.join(', ')}`),
  '',
  'PUBLICATIONS & OPEN SOURCE',
  ...publications.map((p) => `- ${p.title}: ${p.detail}`),
  '',
  'KAGGLE DATASETS (4 datasets, 500+ downloads)',
  ...datasets.map((d) => `- ${d.title}: ${d.detail}`),
].join('\n');

const SYSTEM = `You are Buddy, the friendly assistant on Abishek S's portfolio website. Visitors are mostly recruiters, hiring managers and engineers.

Answer questions about Abishek's work, projects, skills, publications and how to contact him, using only the profile below. Talk about him in the third person ("Abishek built..."). Keep a warm, casual tone, and keep answers short: 2-4 sentences, or a few short lines for lists. Write plain text only: no emoji, no markdown headings, bold, bullets with asterisks, or tables.

If something isn't in the profile (salary, availability dates, location, personal life, opinions he hasn't stated), say you don't know and share his contact lines. Never invent projects, numbers, employers or dates. If someone wants to hire, contact or message Abishek, share the contact lines. For questions unrelated to Abishek, give a one-line friendly redirect back to what you can help with.

PROFILE
${PROFILE}`;

const OFFLINE = `I've answered a lot of questions today, so my AI side is resting until tomorrow. Try the suggested questions below, or reach Abishek directly:\n${CONTACT}`;

// Strips emoji the model might still add (the site owner doesn't want them).
const noEmoji = (text: string) => text.replace(/\p{Extended_Pictographic}️?|‍/gu, '');

// Counts AI answers per UTC day in Netlify Blobs. Fails closed on Netlify (no store = no AI), and
// open only in local dev (vite.config.ts sets BUDDY_LOCAL), where Blobs isn't available.
async function withinDailyLimit(): Promise<boolean> {
  try {
    const store = getStore('buddy-usage');
    const day = new Date().toISOString().slice(0, 10);
    const used = Number(await store.get(day)) || 0;
    if (used >= DAILY_LIMIT) return false;
    await store.set(day, String(used + 1));
    return true;
  } catch (error) {
    if (process.env.BUDDY_LOCAL) return true;
    console.error('buddy usage store unavailable', error);
    return false;
  }
}

// Created on first use so a missing key turns into a friendly reply instead of a crash at load.
let client: Anthropic | null = null;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function parse(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const messages = (body as { messages: ChatMessage[] }).messages.slice(-MAX_TURNS);
  const clean = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  // The conversation must start with the visitor and end with their latest question.
  while (clean.length && clean[0].role !== 'user') clean.shift();
  if (!clean.length || clean[clean.length - 1].role !== 'user') return null;
  return clean;
}

const text = (body: string) => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const messages = parse(await req.json().catch(() => null));
  if (!messages) return new Response('Bad request', { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) return text(`My AI side isn't switched on yet. You can reach Abishek directly:\n${CONTACT}`);
  if (!(await withinDailyLimit())) return text(OFFLINE);
  client ??= new Anthropic();

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 600, // chat replies are deliberately short
    output_config: { effort: 'low' },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    cache_control: { type: 'ephemeral' },
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            const chunk = noEmoji(event.delta.text);
            if (chunk) controller.enqueue(encoder.encode(chunk));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === 'refusal') {
          controller.enqueue(encoder.encode(`Sorry, I can't help with that one. Try asking about Abishek's projects or skills!`));
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          controller.enqueue(encoder.encode(`I'm getting a lot of questions right now. Give me a minute and try again!`));
        } else {
          console.error('buddy error', error);
          controller.enqueue(encoder.encode(`I'm having trouble connecting right now. You can reach Abishek directly:\n${CONTACT}`));
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
};
