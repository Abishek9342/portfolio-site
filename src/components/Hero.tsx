import { useEffect, useState } from 'react';
import { profile } from '../data/content';
import { ArrowUpRightIcon, DownloadIcon } from './Icons';
import { Terminal } from './Terminal';
import './Hero.css';

const SUB =
  "Production LLM platforms, agentic tools, and full-stack applications, from a Claude-integrated MCP server to a finance operations platform used daily by a retailer's finance team.";
const TOKENS = SUB.split(/(?<= )/);

// Streams the intro like an LLM response: one token at a time with a caret. Every word is
// rendered from the start (hidden until streamed) so the layout never shifts.
function useStream(total: number) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [shown, setShown] = useState(reduce ? total : 0);
  useEffect(() => {
    if (shown >= total) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 500 : 38 + Math.random() * 50);
    return () => clearTimeout(t);
  }, [shown, total]);
  return shown;
}

export function Hero() {
  const shown = useStream(TOKENS.length);
  const streaming = shown < TOKENS.length;

  return (
    <section id="top" className="hero section">
      <div className="dot-grid" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" />
            Currently building PRPL at Pothys Retail
          </div>

          <h1 className="hero-title">
            I build AI systems that <span className="accent-em">ship</span>, not just demos.
          </h1>
          <p className="hero-sub" aria-label={SUB}>
            <span className="hero-sub-model" aria-hidden="true">
              <span className="hero-sub-spark">✦</span>
              {streaming ? 'generating' : 'response'}
            </span>
            <span aria-hidden="true">
              {TOKENS.map((t, i) => (
                <span key={i} className={i < shown ? 'tok tok-on' : 'tok'}>
                  {t}
                  {i === shown - 1 && streaming && <span className="tok-caret" />}
                </span>
              ))}
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
