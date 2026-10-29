import Anthropic from '@anthropic-ai/sdk';
import { datasets, experience, profile, publications, skillGroups } from '../../src/data/content';

// Buddy: the portfolio's chat assistant. The browser POSTs the conversation to /api/buddy
// (redirected here in netlify.toml); the reply streams back as plain text. The API key
// (ANTHROPIC_API_KEY) lives only in Netlify's environment, never in the browser bundle.

const MODEL = 'claude-opus-5-5';
const MAX_TURNS = 12;
const MAX_CHARS = 1000;

const strip = (s: string) => s.replace(/\*\*/g, '');

// Everything Buddy knows comes from the same content file the site renders.
const PROFILE = [
  `Name: ${profile.name}. Role: ${profile.role}. Email: ${profile.email}.`,
  `GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}. Kaggle: ${profile.kaggle}. Resume: available via the "Download resume" button.`,
  'Education: B.Tech in Artificial Intelligence and Data Science, Mepco Schlenk Engineering College (Oct 2021 - Apr 2025).',
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

Answer questions about Abishek's work, projects, skills, publications and how to contact him, using only the profile below. Talk about him in the third person ("Abishek built..."). Keep a warm, casual, upbeat tone, and keep answers short: 2-4 sentences, or a few short lines for lists. Write plain text without markdown headings, bold or tables.

If something isn't in the profile (salary, availability dates, personal life, opinions he hasn't stated), say you don't know and suggest emailing ${profile.email}. Never invent projects, numbers, employers or dates. If someone wants to hire or contact Abishek, point them to his email or LinkedIn. For questions unrelated to Abishek, give a one-line friendly redirect back to what you can help with.

PROFILE
${PROFILE}`;

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

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const messages = parse(await req.json().catch(() => null));
  if (!messages) return new Response('Bad request', { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(`Buddy isn't switched on yet. Meanwhile you can reach Abishek at ${profile.email}.`, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  client ??= new Anthropic();

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 1024, // chat replies are deliberately short
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
            controller.enqueue(encoder.encode(event.delta.text));
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
          controller.enqueue(encoder.encode(`I'm having trouble connecting right now. You can reach Abishek at ${profile.email}.`));
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
