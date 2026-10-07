import { profile } from '../data/content';
import { ArrowUpRightIcon, DownloadIcon } from './Icons';
import './Hero.css';

const terminalLines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, text: 'abishek — ai engineer' },
  { prompt: true, text: 'cat stack.txt' },
  { prompt: false, text: 'python · typescript · fastapi · react' },
  { prompt: false, text: 'aws lambda · gcp · langchain' },
  { prompt: true, text: 'status --current' },
  { prompt: false, text: 'building prpl @ pothys retail', accent: true },
];

export function Hero() {
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
          <p className="hero-sub">
            Production LLM platforms, agentic tools, and full-stack applications, from a
            Claude-integrated MCP server to a finance operations platform used daily by a
            retailer's finance team.
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

        <div className="terminal card" aria-hidden="true">
          <div className="terminal-bar">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-amber" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">abishek — zsh</span>
          </div>
          <div className="terminal-body">
            {terminalLines.map((line, i) => (
              <div className="terminal-line" key={i}>
                {line.prompt ? (
                  <>
                    <span className="terminal-prompt">❯</span>
                    <span className="terminal-cmd">{line.text}</span>
                  </>
                ) : (
                  <span className={line.accent ? 'terminal-out terminal-out-accent' : 'terminal-out'}>
                    {line.text}
                  </span>
                )}
              </div>
            ))}
            <div className="terminal-line">
              <span className="terminal-prompt">❯</span>
              <span className="terminal-cursor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
