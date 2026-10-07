# Portfolio Site — Handoff Log

Newest entry first. Add an entry for every change session: what changed, where it was
checked, and whether it is live.

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
