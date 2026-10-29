import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { experience, profile, publications, skillGroups } from '../data/content';
import { openBuddy } from './buddyEvent';

// A small working shell in the hero: visitors can type commands and get real answers from
// the site content. The intro lines are the same ones the static terminal used to show.

type Entry = { kind: 'cmd' | 'out' | 'accent' | 'muted' | 'error'; text: ReactNode };

const intro: Entry[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'abishek — ai engineer' },
  { kind: 'cmd', text: 'cat stack.txt' },
  { kind: 'out', text: 'python · typescript · fastapi · react' },
  { kind: 'out', text: 'aws lambda · gcp · langchain' },
  { kind: 'cmd', text: 'status --current' },
  { kind: 'accent', text: 'building prpl @ pothys retail' },
];

const sections: Record<string, string> = {
  home: 'top',
  experience: 'experience',
  skills: 'skills',
  publications: 'publications',
  contact: 'contact',
};

const links: Record<string, string> = {
  github: profile.github,
  linkedin: profile.linkedin,
  kaggle: profile.kaggle,
  pypi: 'https://pypi.org/project/truscanner',
};

const COMMANDS = ['help', 'ask', 'buddy', 'about', 'projects', 'skills', 'papers', 'resume', 'contact', 'open', 'goto', 'clear', 'sudo hire abishek'];

function link(href: string, label: string) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="term-link">
      {label}
    </a>
  );
}

function run(raw: string): Entry[] | 'clear' {
  const input = raw.trim().replace(/\s+/g, ' ');
  const [cmd, ...args] = input.toLowerCase().split(' ');
  const arg = args.join(' ');

  switch (cmd) {
    case '':
      return [];
    case 'help':
    case 'ls':
      return [
        { kind: 'muted', text: 'available commands:' },
        { kind: 'out', text: 'ask <q>     ask Buddy, my assistant' },
        { kind: 'out', text: 'about       who I am' },
        { kind: 'out', text: 'projects    what I have built' },
        { kind: 'out', text: 'skills      my stack' },
        { kind: 'out', text: 'papers      publications & open source' },
        { kind: 'out', text: 'resume      download my resume' },
        { kind: 'out', text: 'contact     ways to reach me' },
        { kind: 'out', text: 'open <github|linkedin|kaggle|pypi>' },
        { kind: 'out', text: 'goto <experience|skills|publications|contact>' },
        { kind: 'out', text: 'clear       wipe the screen' },
      ];
    case 'about':
    case 'whoami':
      return [
        { kind: 'out', text: 'AI engineer, 1.5 yrs shipping production LLM systems.' },
        { kind: 'out', text: 'now: finance ops platform @ Pothys Retail.' },
        { kind: 'out', text: 'before: 4 AI SaaS products @ CobuildX.ai.' },
      ];
    case 'projects':
      return experience.flatMap((job) => [
        { kind: 'accent' as const, text: `${job.company.toLowerCase()} (${job.dates.toLowerCase()})` },
        ...job.projects.map((p) => ({ kind: 'out' as const, text: `  · ${p.title}` })),
      ]);
    case 'skills':
      return skillGroups.map((g) => ({ kind: 'out' as const, text: `${g.label.toLowerCase().padEnd(14)}${g.items.join(', ')}` }));
    case 'papers':
    case 'publications':
      return publications.map((p) => ({ kind: 'out' as const, text: p.link ? link(p.link, p.title) : p.title }));
    case 'resume':
    case 'cv': {
      const a = document.createElement('a');
      a.href = profile.resumeUrl;
      a.download = '';
      a.click();
      return [{ kind: 'accent', text: 'downloading Abishek-resume.pdf …' }];
    }
    case 'contact':
      return [
        { kind: 'out', text: link(`mailto:${profile.email}`, profile.email) },
        { kind: 'out', text: link(profile.linkedin, 'linkedin') },
        { kind: 'out', text: link(profile.github, 'github') },
      ];
    case 'open': {
      const url = links[arg];
      if (!url) return [{ kind: 'error', text: `open: try one of ${Object.keys(links).join(', ')}` }];
      window.open(url, '_blank', 'noreferrer');
      return [{ kind: 'muted', text: `opening ${arg} …` }];
    }
    case 'goto':
    case 'cd': {
      const id = sections[arg.replace(/^\.?\//, '')];
      if (!id) return [{ kind: 'error', text: `goto: no section "${arg}"` }];
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return [{ kind: 'muted', text: `→ ${arg}` }];
    }
    case 'ask':
    case 'buddy':
      openBuddy(input.slice(cmd.length).trim() || undefined);
      return [{ kind: 'accent', text: arg ? 'asking buddy …' : 'buddy is listening →' }];
    case 'clear':
      return 'clear';
    case 'sudo':
      if (arg === 'hire abishek') {
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`;
        return [{ kind: 'accent', text: 'permission granted. opening your mail client …' }];
      }
      return [{ kind: 'error', text: 'nice try. (hint: sudo hire abishek)' }];
    default:
      return [{ kind: 'error', text: `command not found: ${cmd}. type "help"` }];
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Entry[]>(intro);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [used, setUsed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function submit(text: string) {
    const result = run(text);
    setUsed(true);
    if (text.trim()) setHistory((h) => [text, ...h]);
    setCursor(-1);
    setValue('');
    if (result === 'clear') {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { kind: 'cmd', text }, ...result]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submit(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (next >= 0) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next >= 0 ? history[next] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <div className="terminal card" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-amber" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">abishek — zsh</span>
        <span className="terminal-live">interactive</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div className="terminal-line" key={i}>
            {line.kind === 'cmd' ? (
              <>
                <span className="terminal-prompt">❯</span>
                <span className="terminal-cmd">{line.text}</span>
              </>
            ) : (
              <span className={`terminal-out terminal-out-${line.kind}`}>{line.text}</span>
            )}
          </div>
        ))}
        <label className="terminal-line terminal-input-line">
          <span className="terminal-prompt">❯</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={used ? '' : 'type "help" and press enter'}
            aria-label="Terminal command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </label>
      </div>
      {!used && (
        <div className="terminal-chips">
          {['help', 'projects', 'buddy', 'sudo hire abishek'].map((c) => (
            <button
              type="button"
              key={c}
              className="terminal-chip"
              onClick={(e) => {
                e.stopPropagation();
                submit(c);
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
