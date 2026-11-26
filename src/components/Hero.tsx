import { useEffect, useState } from 'react';
import { profile } from '../data/content';
import { ArrowUpRightIcon, DownloadIcon } from './Icons';
import { Terminal } from './Terminal';
import './Hero.css';

// The intro rotates through these (about Abishek, not individual projects) like successive LLM responses: each one streams in token by token,
// holds for HOLD_MS, fades out, and the next one starts. The first line is the one screen readers get.
const LINES = [
  "Production LLM platforms, agentic tools, and full-stack applications, from a Claude-integrated MCP server to a finance operations platform used daily by a retailer's finance team.",
  'An AI engineer who takes LLM ideas past the demo stage and into tools people rely on every day.',
  "A year and a half of building production AI, from a startup's legal and sales tools to a retailer's finance systems.",
  'I own what I build end to end: architecture, backend, frontend, tests, deployment and keeping it running.',
  'Agentic AI is my focus: tool-using agents with guardrails, approval steps and a second model that checks the first.',
  'I build AI that can be trusted with real numbers. Code does the calculating, the model does the explaining.',
  'At home across the stack: Python and FastAPI, React and TypeScript, PostgreSQL, AWS and Google Cloud.',
  'Hands-on with Claude, MCP, RAG, function calling and evaluation suites, picked for the job rather than the hype.',
  'Domain depth in finance automation: GST, reconciliations and ERP integrations, not just generic chatbots.',
  'I build alongside the people who use the result, and measure success by the manual work that disappears.',
  'Beyond the day job: an open-source PyPI tool, public Kaggle datasets, a live multiplayer app and client websites.',
  'Looking for teams that want AI in production, judged by results rather than demos.',
];
const TOKENS = LINES.map((l) => l.split(/(?<= )/));
// the longest line sizes the box, so the buttons below never move when the text changes
const SIZER = LINES.reduce((a, b) => (b.length > a.length ? b : a));
const HOLD_MS = 5000;
const FADE_MS = 350;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Which line is on screen, how many of its tokens are streamed, and whether it is fading out. */
function useRotatingStream() {
  const reduce = prefersReducedMotion();
  const [line, setLine] = useState(0);
  const [shown, setShown] = useState(reduce ? TOKENS[0].length : 0);
  const [leaving, setLeaving] = useState(false);
  const total = TOKENS[line].length;
  useEffect(() => {
    if (reduce) return; // reduced motion: the first line, static
    let t: number;
    if (shown < total) {
      t = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 500 : 38 + Math.random() * 50);
    } else if (!leaving) {
      t = window.setTimeout(() => setLeaving(true), HOLD_MS);
    } else {
      t = window.setTimeout(() => {
        setLine((i) => (i + 1) % LINES.length);
        setShown(0);
        setLeaving(false);
      }, FADE_MS);
    }
    return () => clearTimeout(t);
  }, [shown, total, leaving, reduce]);
  return { line, shown, leaving, streaming: shown < total };
}

export function Hero() {
  const { line, shown, leaving, streaming } = useRotatingStream();

  return (
    <section id="top" className="hero section">
      <div className="dot-grid" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" />
            Building finance automation at Pothys Retail
          </div>

          <h1 className="hero-title">
            I build AI systems that <span className="accent-em">ship</span>, not just demos.
          </h1>
          <p className="hero-sub" aria-label={LINES[0]}>
            <span className="hero-sub-model" aria-hidden="true">
              <span className="hero-sub-spark">✦</span>
              {streaming ? 'generating' : 'response'}
            </span>
            <span className="hero-sub-stack" aria-hidden="true">
              <span className="hero-sub-sizer">{SIZER}</span>
              <span key={line} className={leaving ? 'hero-sub-line is-leaving' : 'hero-sub-line'}>
                {TOKENS[line].map((t, i) => (
                  <span key={i} className={i < shown ? 'tok tok-on' : 'tok'}>
                    {t}
                    {i === shown - 1 && streaming && <span className="tok-caret" />}
                  </span>
                ))}
              </span>
            </span>
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={profile.resumeUrl} download>
              <DownloadIcon size={14} />
              Download resume
            </a>
            <a className="btn btn-secondary" href="#experience">
              View my work
              <ArrowUpRightIcon size={13} />
            </a>
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
