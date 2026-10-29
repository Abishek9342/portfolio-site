import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FALLBACK_ANSWER, faqById, type Faq } from '../data/faq';
import { match, suggest } from './buddyBrain';
import { OPEN_BUDDY_EVENT, type OpenBuddyDetail } from './buddyEvent';
import { WhatsAppIcon } from './Icons';
import './Buddy.css';

// Buddy: chat assistant that answers questions about Abishek from a predefined answer bank
// (data/faq.ts, matched in buddyBrain.ts), typed out word by word, with three follow-up
// questions offered after every reply. Other parts of the site
// (the terminal's ask/buddy command) open it by dispatching OPEN_BUDDY_EVENT, optionally with a question.

// When true, questions the answer bank can't handle go to the Claude-backed /api/buddy
// (netlify/functions/buddy.mts). Needs ANTHROPIC_API_KEY set on Netlify; see handoff.md.
const AI_FALLBACK = false;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETING: Msg = {
  role: 'assistant',
  content: "Hey! I'm Buddy, Abishek's assistant. Ask me anything about his work, projects or skills, or pick a question below.",
};

const NOTHING_ASKED: ReadonlySet<string> = new Set();

// Turns emails and links in a reply into clickable anchors; WhatsApp links become a button.
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https:\/\/wa\.me\/\S+|https?:\/\/[^\s)]*[^\s).,!?]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('https://wa.me/')) {
          return (
            <a key={i} href={part} target="_blank" rel="noreferrer" className="buddy-wa">
              <WhatsAppIcon size={14} />
              Chat on WhatsApp
            </a>
          );
        }
        if (/^https?:\/\//.test(part)) {
          return (
            <a key={i} href={part} target="_blank" rel="noreferrer">
              {part.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          );
        }
        if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(part)) {
          return (
            <a key={i} href={`mailto:${part}`}>
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

// Buddy's face: the pupils drift toward the pointer.
function BuddyFace({ size = 34 }: { size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 220);
      setLook({ x: (dx / d) * 1.8 * reach, y: (dy / d) * 1.6 * reach });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <svg ref={ref} className="buddy-face" viewBox="0 0 34 34" width={size} height={size} aria-hidden="true">
      <rect x="1" y="1" width="32" height="32" rx="11" className="buddy-face-bg" />
      <g className="buddy-eyes">
        <ellipse cx="12" cy="15" rx="3.6" ry="4.2" fill="#fff" />
        <ellipse cx="22" cy="15" rx="3.6" ry="4.2" fill="#fff" />
        <circle cx={12 + look.x} cy={15.4 + look.y} r="1.9" fill="#211f1a" />
        <circle cx={22 + look.x} cy={15.4 + look.y} r="1.9" fill="#211f1a" />
      </g>
      <path d="M13 23.2c2.2 1.6 5.8 1.6 8 0" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Buddy() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [asked, setAsked] = useState<ReadonlySet<string>>(NOTHING_ASKED);
  const [chips, setChips] = useState<Faq[]>(() => suggest(null, NOTHING_ASKED));
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const askRef = useRef<(q: string) => void>(() => {});

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, chips, open]);

  // `faqId` is set when a suggestion chip was tapped, so the exact entry is answered.
  async function ask(question: string, faqId?: string) {
    const q = question.trim();
    if (!q || busy) return;
    const faq = (faqId && faqById.get(faqId)) || match(q);
    const nowAsked = faq ? new Set(asked).add(faq.id) : asked;
    setAsked(nowAsked);
    setChips([]);
    const history: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);

    const append = (text: string) =>
      setMessages((prev) => {
        const next = prev.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + text };
        return next;
      });

    try {
      if (faq || !AI_FALLBACK) {
        // Short "thinking" pause, then type the answer out a few characters at a time.
        await sleep(450);
        const reply = faq?.answer ?? FALLBACK_ANSWER;
        for (const token of reply.match(/\S+\s*/g) ?? []) {
          append(token);
          await sleep(18 + Math.random() * 22);
        }
        return;
      }
      const res = await fetch('/api/buddy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The greeting is UI only; the API conversation starts with the visitor.
        body: JSON.stringify({ messages: history.filter((m) => m !== GREETING) }),
      });
      if (!res.ok || !res.body) throw new Error(`status ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        append(decoder.decode(value, { stream: true }));
      }
    } catch {
      append(FALLBACK_ANSWER);
    } finally {
      setChips(suggest(faq?.id ?? null, nowAsked));
      setBusy(false);
      inputRef.current?.focus({ preventScroll: true });
    }
  }
  useEffect(() => {
    askRef.current = ask;
  });

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<OpenBuddyDetail>).detail?.question;
      if (q) askRef.current(q);
    };
    window.addEventListener(OPEN_BUDDY_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BUDDY_EVENT, onOpen);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <>
      {open && (
        <section className="buddy-panel card" role="dialog" aria-label="Chat with Buddy">
          <header className="buddy-head">
            <BuddyFace size={36} />
            <div className="buddy-head-text">
              <strong>Buddy</strong>
              <span>
                <span className="buddy-online" />
                Abishek's assistant
              </span>
            </div>
            <button type="button" className="buddy-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              ×
            </button>
          </header>

          <div className="buddy-list" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'buddy-msg buddy-msg-user' : 'buddy-msg buddy-msg-bot'}>
                {m.content ? (
                  <Linkified text={m.content} />
                ) : (
                  <span className="buddy-typing" aria-label="Buddy is typing">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </div>
            ))}
            {!busy && chips.length > 0 && (
              <div className="buddy-suggest" aria-label="Suggested questions">
                {chips.map((c) => (
                  <button type="button" key={c.id} onClick={() => ask(c.q!, c.id)}>
                    {c.q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="buddy-form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Buddy about Abishek…"
              maxLength={1000}
              aria-label="Your question"
              autoFocus
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
          <p className="buddy-foot">Answers come from Abishek's portfolio.</p>
        </section>
      )}

      <button
        type="button"
        className={open ? 'buddy-launcher buddy-launcher-open' : 'buddy-launcher'}
        aria-label={open ? 'Close Buddy' : 'Chat with Buddy'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <BuddyFace size={30} />
        <span className="buddy-launcher-label">{open ? 'Close' : 'Ask Buddy'}</span>
      </button>
    </>
  );
}
