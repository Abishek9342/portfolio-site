import { faqById, faqs, STARTERS, type Faq } from '../data/faq';

// Picks the FAQ entry whose keywords best match a question, and chooses follow-up
// suggestions. No network, no API key.

// Filler words that say nothing about the topic.
const STOP = new Set(
  'a an the is are was were be of to in on at for with and or but what whats which how does do did has have had can could would should will his he i me my your it its this that there tell about please some any more give show from by him where s t d ll re ve m'.split(' ')
);

// Words that only count for half: they show up in many questions ("hi, what are his skills?").
const WEAK = new Set(['hi', 'hello', 'hey', 'yo', 'thanks', 'thank', 'ok', 'okay', 'cool', 'nice', 'great', 'abishek', 'work', 'build', 'built', 'know', 'now', 'with', 'you', 'model', 'experience', 'code', 'open', 'good', 'use', 'used', 'new', 'tool']);

const stem = (w: string) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);

// "hiiii" -> "hi", "thanksss" -> "thanks": stretched letters (3+ in a row) collapse to one.
const unstretch = (text: string) => text.toLowerCase().replace(/([a-z])\1{2,}/g, '$1');

function tokens(text: string): string[] {
  return unstretch(text)
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

const keySets = new Map(faqs.map((f) => [f.id, new Set(f.keywords.map(stem))]));
// An entry's own suggested question counts too (a bit less than its keywords), so typing it back matches.
const questionSets = new Map(faqs.map((f) => [f.id, new Set(tokens(f.q ?? ''))]));

const normalise = (text: string) => tokens(text).join(' ');
const exact = new Map(faqs.filter((f) => f.q).map((f) => [normalise(f.q!), f]));

export function match(question: string): Faq | null {
  const casual = unstretch(question).trim();
  const byPattern = faqs.find((f) => f.patterns?.some((p) => p.test(casual)));
  if (byPattern) return byPattern;

  const words = tokens(question);
  if (!words.length) return null;
  const hit = exact.get(words.join(' '));
  if (hit) return hit;

  let best: Faq | null = null;
  let bestScore = 0;
  for (const faq of faqs) {
    const keys = keySets.get(faq.id)!;
    const fromQuestion = questionSets.get(faq.id)!;
    const s = words.reduce((sum, w) => {
      const weight = keys.has(w) ? 1 : fromQuestion.has(w) ? 0.75 : 0;
      return sum + weight * (WEAK.has(w) ? 0.5 : 1);
    }, 0);
    if (s > bestScore) {
      bestScore = s;
      best = faq;
    }
  }
  return bestScore >= 0.5 ? best : null;
}

// Three questions to offer next: the answer's own follow-ups first, then others from the
// same topic, then the general starters. Never repeats something already asked.
export function suggest(lastId: string | null, asked: ReadonlySet<string>, count = 3): Faq[] {
  const last = lastId ? faqById.get(lastId) : undefined;
  const sameTopic = last ? faqs.filter((f) => f.topic === last.topic).map((f) => f.id) : [];
  const pool = [...(last?.next ?? []), ...sameTopic, ...STARTERS, ...faqs.map((f) => f.id)];

  const picked: Faq[] = [];
  for (const id of pool) {
    const faq = faqById.get(id);
    if (!faq?.q || asked.has(id) || id === lastId || picked.includes(faq)) continue;
    picked.push(faq);
    if (picked.length === count) break;
  }
  return picked;
}
