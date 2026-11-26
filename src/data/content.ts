export const profile = {
  name: 'Abishek S',
  role: 'AI Engineer',
  email: 'abisheksridharan.work@gmail.com',
  github: 'https://github.com/Abishek9342',
  linkedin: 'https://www.linkedin.com/in/abishek-sridharan-7272562a5/',
  kaggle: 'https://www.kaggle.com/abishek9324',
  whatsappNumber: '919342764046',
  resumeUrl: '/Abishek-resume.pdf',
};

// WhatsApp DM link with a friendly prefilled message (used by Contact and Buddy).
const WHATSAPP_PREFILL = "Hi Abishek, I saw your portfolio and I'd like to connect.";
export const whatsappUrl = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

// Descriptions use **double asterisks** for the key result, rendered bold
// (see RichText in Experience.tsx).
export type WorkProject = {
  title: string;
  tags: string[];
  description: string;
  link?: string;
};

export type Experience = {
  company: string;
  role: string;
  dates: string;
  projects: WorkProject[];
};

export const experience: Experience[] = [
  {
    company: 'Pothys Retail Pvt Ltd',
    role: 'AI Engineer',
    dates: 'Jul 2026 – Present',
    projects: [
      {
        title: 'Finance Operations Platform',
        tags: ['FastAPI', 'React 19', 'PostgreSQL', 'GCP', 'Microsoft Graph'],
        description:
          "Built and own the company's finance automation platform: **13 finance areas** with **about 20 reconciliation engines used daily** by the finance team, on **~245 API endpoints** and **about 1,000 automated tests**. Own the architecture, backend, frontend and production on Google Cloud, hardened with role-based access, JWT and Google sign-in, upload checks and rate limits. Statements and vendor notices go out through **Microsoft 365 (Graph API)** with certificate-based authentication and **rate-limited batch delivery**.",
      },
      {
        title: 'Reconciliation and Compliance Engines',
        tags: ['Python', 'Pandas', 'SAP OData', 'OCR'],
        description:
          'Designed the engines behind the platform: a multi-level **GST input tax credit reconciliation** that matches SAP purchases against GSTR-2B **in minutes** and automates vendor compliance notices from the live SAP vendor master; **inter-company matching** across ledgers (n-way, same-sign and cross-ledger) with an audited manual-match screen; and validation of **bank statements and about 10 payment channels**, driven by **declarative configuration instead of per-format code**, with every total checked against its source.',
      },
      {
        title: 'LLM Finance Assistant and Agents',
        tags: ['LLM Function Calling', 'Agentic AI', 'FastAPI'],
        description:
          "Built a conversational **LLM assistant** that answers finance questions from **live reconciliation data through function calling** and prepares actions that **run only after the user confirms them**, with that user's own permissions. The rule across the platform is **AI explains, code calculates**: deterministic code produces every figure, while the model triages daily reconciliation health, explains exceptions and ranks match candidates. Includes a **maker/checker agent**, where a second model verifies the first one's findings against the source data, and an **evaluation suite** for the assistant.",
      },
      {
        title: 'End-to-End Work Automation Agent',
        tags: ['Agentic AI', 'FastAPI', 'Playwright', 'Function Calling'],
        description:
          'Built a multi-user **work automation agent**: staff describe a task in plain words and it carries it out end to end with **54 tools**, running finance-platform modules as the signed-in user, pulling ERP reports through an outbound-only relay, analysing files in a **network-free Python sandbox**, browsing, and running schedules and triggers. Anything that sends or changes data **stops on an approval card that shows the real action**, outside text is fenced off against prompt injection, and a verifier model checks longer jobs. **300+ automated tests.**',
      },
    ],
  },
  {
    company: 'CobuildX.ai',
    role: 'AI Engineer',
    dates: 'Apr 2025 – Jun 2026',
    projects: [
      {
        title: 'Lead Management MCP Server',
        tags: ['AWS Lambda', 'MCP', 'Claude', 'EventBridge'],
        description:
          'Built a **Model Context Protocol server on AWS Lambda** exposing **8 tools to Claude** for B2B sales automation: lead management, CRM filtering, ideal-customer-profile scoring (0 to 100) and contact enrichment through Apify with a Hunter.io fallback. Added a scheduled EventBridge worker for Slack reminders that **removed the manual steps from sales outreach**.',
        link: 'https://github.com/Abishek9342/lead-management',
      },
      {
        title: 'truAI: Legal RAG Platform',
        tags: ['FastAPI', 'React', 'LangChain', 'AWS Lambda'],
        description:
          'Delivered a **DPDPA-compliant legal research platform** that streams answers with **sub-second first-token latency**, grounded in citations that separate binding statutes from non-binding guidance. Included an automated GitHub scanner for 300+ PII and cookie-compliance patterns, **reducing manual legal review effort by ~40%**.',
      },
      {
        title: 'truScanner (open source, PyPI)',
        tags: ['Python', 'AWS Bedrock', 'Ollama'],
        description:
          'Built and **published an open-source CLI on PyPI** (v0.2.10) that scans codebases for **300+ patterns of personal and financial data**, such as social security numbers, card numbers and API keys, with a three-tier LLM fallback (AWS Bedrock, Ollama, local quantised models) so it **runs fully offline**.',
        link: 'https://pypi.org/project/truscanner',
      },
      {
        title: 'WarpX: AI Collaborative Workspace',
        tags: ['React', 'FastAPI', 'Supabase'],
        description:
          'Designed a **two-level LLM memory architecture** that summarises each thread into a channel-wide context store, so the assistant keeps long-term context while **cutting per-message token cost by ~60%** through summary caching.',
      },
    ],
  },
  {
    company: 'Personal projects',
    role: 'Independent',
    dates: 'Oct 2026 – Present',
    projects: [
      {
        title: 'Playroom: Multiplayer Games App',
        tags: ['React', 'Cloudflare Workers', 'Durable Objects', 'D1', 'WebRTC'],
        description:
          "Built and shipped a **mobile-first multiplayer games app** with five games: Word Chain, XO, Patches, 5 Cards and Imposter. Friends join a live room with a 6-letter code, and **the server is the referee**: every move is checked by one rules engine running in a **Cloudflare Durable Object per room**, the same engine that powers practice games against bots. Includes accounts with Google sign-in, **voice chat over WebRTC**, pause and rematch, rankings and an installable PWA, all on Cloudflare's **free plan**.",
        link: 'https://playroom.vibezone-games.workers.dev',
      },
    ],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
  {
    label: 'AI & LLMs',
    items: ['Anthropic Claude', 'LangChain', 'AWS Bedrock', 'Google Vertex AI', 'RAG', 'LLM Agents', 'Ollama', 'PyTorch', 'TensorFlow'],
  },
  {
    label: 'Backend & APIs',
    items: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'MCP', 'REST', 'JWT', 'Microsoft Graph', 'SAP OData'],
  },
  { label: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
  { label: 'Databases', items: ['PostgreSQL', 'Supabase', 'DynamoDB', 'ChromaDB'] },
  { label: 'Cloud & DevOps', items: ['GCP', 'AWS Lambda', 'Docker', 'nginx', 'Linux', 'GitHub Actions', 'Git'] },
  { label: 'Testing', items: ['Pytest', 'Locust'] },
];

export type Publication = {
  title: string;
  detail: string;
  link?: string;
  linkLabel?: string;
};

export const publications: Publication[] = [
  {
    title: 'YOLO-ASCA: A Rule-Based Framework for Identifying Safety Risks in Construction Management',
    detail: 'WiSPNET 2025, SSN College of Engineering, Chennai. Published on IEEE Xplore.',
    link: 'https://ieeexplore.ieee.org/document/11005349/',
    linkLabel: 'View on IEEE Xplore',
  },
  {
    title: 'truScanner v0.2.10',
    detail: 'Open-source CLI for PII and financial data detection, published on PyPI.',
    link: 'https://pypi.org/project/truscanner',
    linkLabel: 'View on PyPI',
  },
];

const K = 'https://www.kaggle.com/datasets/abishek9324/';

export const datasets: Publication[] = [
  {
    title: 'Agent Failure Atlas 2026',
    detail:
      'Reproducible benchmark of multi-step AI-agent trajectories: a 9-table relational dataset with 2,202 runs, 25,964 steps and a 30-category failure taxonomy. The most downloaded of the four.',
    link: K + 'agent-failure-atlas-2026',
    linkLabel: 'View on Kaggle',
  },
  {
    title: 'Fuzzy Invoice Reconciliation',
    detail:
      'Accounts-payable dataset with a solver that applies exact, fuzzy and subset-sum matching in sequence and recovers 94.4% of true matching pairs.',
    link: K + 'fuzzy-invoice-reconciliation',
    linkLabel: 'View on Kaggle',
  },
  {
    title: 'Vendor Subset-Sum Matching',
    detail:
      'Matching vendor payments to combinations of open invoices with a meet-in-the-middle solver: 99.2% precision and 97.5% recall.',
    link: K + 'vendor-subset-sum-matching',
    linkLabel: 'View on Kaggle',
  },
  {
    title: 'Student Performance & Placement Prediction',
    detail:
      '1,500 students with causally related features and two targets (CGPA and placement), covering regression, classification and clustering in one dataset.',
    link: K + 'student-performance-placement-prediction-ml',
    linkLabel: 'View on Kaggle',
  },
];

// Freelance website samples. Built in ../site-templates and exported (built) into public/work/
// by `npm run export:portfolio` there. Each sample is a fictional business in demo mode.
export type FreelanceProject = {
  slug: string; // served at /work/<slug>/, thumbs at /work/thumbs/<slug>*.jpg
  niche: string;
  name: string;
  pitch: string;
  features: string[];
};

export const freelanceProjects: FreelanceProject[] = [
  {
    slug: 'cafe',
    niche: 'Café & restaurant',
    name: 'Second Decoction',
    pitch: 'Filter-coffee café with a tabbed menu, order slip that sends on WhatsApp, and table booking for music nights.',
    features: ['Menu tabs + veg filter', 'WhatsApp ordering', 'Table booking'],
  },
  {
    slug: 'shop',
    niche: 'Online shop',
    name: 'Thiri & Co.',
    pitch: 'Handmade candle store with quick view, a cart that remembers, and checkout that sends an itemised order.',
    features: ['Cart & checkout', 'Free-delivery bar', 'No payment gateway needed'],
  },
  {
    slug: 'foodcart',
    niche: 'Food cart',
    name: 'Kaaram Chaat Cart',
    pitch: 'Street-food stall that shows where the cart is today and takes orders with spice level and pickup time.',
    features: ['Live location & hours', '+ / − ordering', 'UPI block'],
  },
  {
    slug: 'nursery',
    niche: 'Plant nursery',
    name: 'Thottam Garden Centre',
    pitch: 'Garden centre with a filterable plant catalogue, a 3-question plant finder and garden setup packages.',
    features: ['Plant finder', 'Basket enquiry', 'Service packages'],
  },
  {
    slug: 'clinic',
    niche: 'Dental clinic',
    name: 'Nalam Dental Studio',
    pitch: 'Boutique dental studio with an interactive smile map that turns concerns into a priced treatment plan, sent on WhatsApp.',
    features: ['Smile map + plan estimate', 'Price index', 'WhatsApp booking'],
  },
];

const FREELANCE_PREFILL = 'Hi Abishek, I saw your freelance website samples. I want a website for my business.';
export const freelanceWhatsappUrl = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(FREELANCE_PREFILL)}`;
