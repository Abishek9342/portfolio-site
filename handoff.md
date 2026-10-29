# Portfolio Site — Handoff Log

Newest entry first. Add an entry for every change session: what changed, where it was
checked, and whether it is live.

## 2026-10-28 — Pothys wording matched to the new 1-page resume (NOT pushed)

- `src/data/content.ts`: rewrote the 6 Pothys project descriptions in the resume's professional tone.
  Removed raw operational counts (3.9 lakh, ~2,000 vendors, ~92/~98 accountants, ~58K items, 54 PhonePe
  files) and the module-name list; kept ~20 modules and 500+ tests. CobuildX, skills, publications and
  dataset cards unchanged (site keeps per-project and per-dataset cards on purpose).
- `public/Abishek-resume.pdf` replaced with the new 1-page resume.
- Checked: `tsc -b` clean; desktop screenshot of localhost:5174 looks right. 360/390px check not done
  (no Playwright; headless Edge can't go that narrow), text-only change so low risk.
- Navbar fix: after clicking a nav link and scrolling, the sticky navbar disappeared. Cause:
  `overflow-x: hidden` on both `html` and `body` in `src/index.css`. Changed both to `overflow-x: clip`
  and added `scroll-padding-top: 72px` so anchored sections land below the bar. Verified with a scripted
  headless Edge run (click Skills, scroll 1200px): navbar stays at top 0, active link follows.
- **Buddy, the AI assistant** (user asked for one named Buddy):
  - Server: `netlify/functions/buddy.mts` (Netlify Function, `@anthropic-ai/sdk`), routed by the
    `/api/buddy` redirect in `netlify.toml` (must stay above the SPA `/*` rule). Model `claude-opus-5-5`,
    effort `low`, max_tokens 1024, server-side refusal fallback (`fallbacks: "default"`), auto prompt caching.
    System prompt is built from `src/data/content.ts` (+ education line), so Buddy stays in sync with the site.
    Input capped at 12 turns x 1000 chars. No key -> returns a friendly "not switched on yet" reply.
  - Local dev: `vite.config.ts` plugin serves `/api/buddy` from the same function; key from `.env.local`
    (`ANTHROPIC_API_KEY=...`, gitignored via `*.local`).
  - UI: `src/components/Buddy.tsx/.css` floating "Ask Buddy" launcher + chat panel (face whose eyes follow
    the cursor, streamed replies, suggestion chips, links clickable). Also opened by terminal `ask <q>` /
    `buddy` and Ctrl+K "Ask Buddy" (`buddyEvent.ts`).
  - Checked: tsc (incl. function + vite config), oxlint, API route (no-key reply, 400 on bad input), browser
    run at 1440/390 (open, suggestion, terminal `ask`), 0 console errors. **NOT yet tested with a real key**,
    so real Claude answers are unverified.
  - **Changed same day: Buddy now answers from a predefined FAQ, no AI, no key, free.** User has only a
    claude.ai subscription (no API credits) and the only GCP access on this machine is the employer's
    project, which shouldn't be billed or credentialed for a personal site without approval. Answer bank: `src/data/faq.ts` (general FAQs + one per project, built from `content.ts`);
    matcher: `src/components/buddyBrain.ts` (keyword scoring, stopwords, weak words, project bonus).
    Replies are typed out word by word. 33 sample questions checked: all on-topic ones match, off-topic ones
    get the fallback (email/LinkedIn). Labels say "Abishek's assistant" (not "AI").
  - **Ctrl+K command palette removed entirely** on request (CommandPalette.tsx/.css, paletteEvent.ts deleted;
    Nav.tsx/Nav.css back to the committed version). Buddy now opens only from its launcher and the terminal.
  - Free LLM options researched for later (user has no API credits): Groq free tier recommended (no card,
    fast, OpenAI-compatible); Gemini Flash free tier as alternative (free-tier prompts used by Google).
  - **2026-10-29: Buddy FAQ expanded to 57 entries (54 suggestible) + 3 follow-up chips after every reply.**
    `src/data/faq.ts` now has id/topic/q/keywords/answer/next per entry, grouped: about, Pothys, CobuildX,
    AI, skills, education & research, open source & Kaggle, contact, small talk (never suggested). Answers use
    only facts on record (content.ts + resume); no module names, no promises on Abishek's behalf.
    `buddyBrain.ts`: `match()` (exact-question shortcut, keywords weight 1, own-question words 0.75, weak
    words half, filler words ignored) and `suggest()` (entry's `next` -> same topic -> STARTERS, never an
    already-asked question). Chip taps answer the exact entry by id.
    Tests: all 54 suggested questions match themselves when typed; 43 natural questions all land right;
    off-topic -> fallback; browser run at 1440/390: 3 new chips after each reply, hidden while typing, no
    repeats, chat auto-scrolls to them, 0 console errors.
  - Same day, small talk + WhatsApp: entries can carry `patterns` (regex) checked before keywords, and
    stretched letters collapse ("Hiii" -> "hi"). Small-talk entries: hello, how-are-you, what-can-you-do,
    buddy, who-made-you, ack (ok/cool/lol), thanks, bye. Every contact-sharing answer (contact, hire,
    personal, thanks, bye, fallback) lists Email / LinkedIn / WhatsApp; `whatsappUrl` now lives in
    `content.ts` (shared with Contact.tsx) and Buddy renders wa.me links as a green "Chat on WhatsApp"
    button. Tested: 31 casual messages route right; browser run at 390px shows the button, href = DM with prefill.
  - When adding facts to the site, add/adjust the matching FAQ entry in `faq.ts` and re-run a self-match check.
 get an Anthropic API key, set `ANTHROPIC_API_KEY` on Netlify (and in
    `.env.local`), set `AI_FALLBACK = true` in `Buddy.tsx`; unmatched questions then go to `/api/buddy`.
    Set a monthly spend limit in the Anthropic Console first (public endpoint). The function code stays in repo.
- **The motion pass below was REJECTED by the user** ("older one is better", hated the wave emoji and
  the effect overload). Fully reverted: components restored from git, motion/ease/Marquee files deleted,
  `framer-motion` uninstalled. Lesson: user wants novelty (ideas), not decoration on every section.
- Replaced with 3 focused ideas on top of the ORIGINAL design (nothing else visually changed):
  1. `Terminal.tsx`: the hero terminal is a real shell. Commands: help, about, projects, skills, papers,
     resume (downloads PDF), contact, open <github|linkedin|kaggle|pypi>, goto <section>, clear,
     `sudo hire abishek` (opens mail). History with up/down, Tab completes, Ctrl+L clears, suggestion chips
     until first use. Answers come from `content.ts`.
  2. Hero intro line streams in token by token like an LLM reply, with caret and a "generating → response"
     label (words pre-rendered hidden, so no layout shift; reduced-motion shows it instantly).
  3. `CommandPalette.tsx` (+ `paletteEvent.ts`): Ctrl/Cmd+K menu (sections, download resume, email, copy
     email, profiles), arrow keys + enter, Esc closes; "Ctrl K" button in the nav (hidden on phones).
- Checked by scripted headless Edge at 1440 and 390: commands typed and answered, goto scrolls correctly,
  palette search/close/open-by-button work, 0 console errors, no horizontal overflow; tsc + oxlint clean.
- Old (rejected) motion pass, for reference only: New `src/components/motion.tsx`
  (Reveal, TiltCard with cursor spotlight, Magnetic, ScrollProgress), `ease.ts`, `Marquee.tsx`.
  Nav = floating pill capsule that shrinks on scroll, sliding `layoutId` active pill, mobile menu as
  floating panel + blurred scrim with staggered links. Hero = word-by-word rise, gradient shimmer on
  "ship", self-typing terminal (fixed min-height, no layout jump), terminal tilt, drifting colour orbs,
  scroll parallax, magnetic buttons, scroll cue. Stack ticker between hero and Experience. Experience =
  scroll-filled timeline rail + nodes, staggered projects, hover accent bar. Skills = dark contrast band,
  2-col group cells, spring-pop tiles with brand-colour hover glow. Publications = staggered tilt cards.
  Contact = bigger title + waving hand, soft rotating glow, magnetic links. `MotionConfig reducedMotion="user"`
  plus the existing CSS reduced-motion override.
- Checked with a scripted headless Edge (CDP) run at 1440x900 and 390x844: scrolled through, screenshots of
  each section, mobile menu opens/closes, 0 console errors/warnings, no horizontal overflow; tsc + oxlint clean.
- **Not committed or pushed** (user asked to review on localhost first). Push when user approves.

## Where things are

| What | Where |
|---|---|
| Live site | https://abisheksridharan.netlify.app/ |
| Source repo | https://github.com/Abishek9342/portfolio-site (branch `main`) |
| Hosting | Netlify, auto-builds and publishes every push to `main` (`netlify.toml`: `npm run build`, publish `dist/`) |
| Local copy | `C:\Users\ai_en\OneDrive\Documents\Finance\Personal\portfolio-site` |
| Resume source | `C:\Users\ai_en\OneDrive\Documents\Finance\Personal\Resume\Abishek-resume.pdf` (copied to `public/Abishek-resume.pdf` for the download button) |

## How to see changes

- **Live:** open https://abisheksridharan.netlify.app/ a minute or two after a push. Netlify's
  deploy log is in the Netlify dashboard for this site.
- **Locally before pushing:** `npm install` (first time), then `npm run dev` and open the URL it
  prints (usually http://localhost:5173/). For the production build: `npm run build` then
  `npm run preview`.
- **Phone view:** in Chrome/Edge press F12, then the device toolbar (Ctrl+Shift+M), and pick an
  iPhone or a 360px Android width.

## Where content lives

- All text (experience projects, skills, publications, Kaggle datasets, links, resume path):
  `src/data/content.ts`. In project descriptions, `**text**` is shown in bold.
- Skill tile icons: `src/data/techIcons.ts` (from `simple-icons`; a skill without an entry shows
  two-letter initials).
- Sections, in page order: Hero, Experience (01), Skills (02), Publications (03), Contact (04),
  wired in `src/App.tsx`; nav links in `src/components/Nav.tsx`.

## Updating the resume

1. Replace `public/Abishek-resume.pdf` with the new PDF (keep the file name, or update
   `profile.resumeUrl` in `src/data/content.ts`).
2. Mirror any wording changes in `src/data/content.ts` so the site and the PDF match.
3. Commit and push to `main`.

## Known issues

- `npm run lint` (oxlint) fails with "Cannot find native binding" — a broken optional-dependency
  install that predates 2026-10-07. Fix: delete `node_modules` and `package-lock.json`, run
  `npm install`. TypeScript checking still runs as part of `npm run build`.

---

## 2026-10-07 — Matched the October 2026 resume + mobile menu

- **Experience:** each company now lists separate projects (title, tech tags, description with
  bold results) instead of bullet points. Pothys Retail: PRPL Finance Operations Platform, GST
  Input Tax Credit Reconciliation, Enterprise Email Integration, LLM Finance Assistant and
  Agents, AP Accountant Performance Analytics, Bank Statement Processing Engine. CobuildX.ai:
  Lead Management MCP Server, truAI, truScanner, WarpX. No Gemini mentions, no "Onsite".
- **Removed:** the OCR featured-project section and the "More projects" section (college
  projects), with their components, CSS and nav link.
- **Publications:** YOLO-ASCA paper and truScanner, plus a Kaggle datasets row with the 4
  datasets actually published on the account (Agent Failure Atlas 2026, Fuzzy Invoice
  Reconciliation, Vendor Subset-Sum Matching, Student Performance & Placement Prediction;
  checked with `kaggle datasets list --user abishek9324`). The old "Bank Statement Multi-Format
  Parsing" link pointed to a dataset that is not published, so it was removed.
- **Skills:** same trimmed list as the resume; added Ollama, Pytest, Locust, Linux, SAP OData;
  Vertex AI now uses the Google Cloud icon.
- **Resume download:** `public/resume.pdf` replaced by `public/Abishek-resume.pdf`.
- **Location removed** from the footer and the hero terminal (matches the resume).
- **Mobile:** below 640px the nav collapses into a menu button with a dropdown (the five links
  overflowed at 360-390px and cut off Contact).
- **Checked:** `npm run build` passes; full-page renders at 360, 390 and 768px wide via headless
  Edge with device emulation showed no horizontal overflow; desktop at 1440px; resume link
  returns the PDF.
- **Pushed** to `main` on GitHub (Netlify deploys it).
