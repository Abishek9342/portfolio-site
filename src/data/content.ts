export const profile = {
  name: 'Abishek S',
  role: 'AI Engineer',
  location: 'Chennai, India',
  email: 'abisheksridharan.work@gmail.com',
  github: 'https://github.com/Abishek9342',
  linkedin: 'https://www.linkedin.com/in/abishek-sridharan-7272562a5/',
  kaggle: 'https://www.kaggle.com/abishek9324',
  whatsappNumber: '919342764046',
  resumeUrl: '/resume.pdf',
};

export type Experience = {
  company: string;
  role: string;
  dates: string;
  mode: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: 'Pothys Retail Pvt Ltd',
    role: 'AI Engineer',
    dates: 'Jul 2026 — Present',
    mode: 'Onsite',
    bullets: [
      "Building and maintaining PRPL, a production FastAPI + React 19/TypeScript finance platform for Pothys Retail's finance team, spanning ~15 independent reconciliation modules: AP/vendor, AR/customer, GST, TDS, GR/IR, inter-company transfers, bank & treasury, credit card, tender/commission, gift card & loyalty.",
      'Engineered a bank-format-agnostic statement parsing engine (PDF, XLSX, XLS, CSV) handling ruled-table and borderless/word-position-reconstructed PDF layouts across 5+ banks via a synonym-driven tolerant column mapper with algebraic trailer-total cross-validation; grew its dedicated test suite from 46 to 69 passing tests against real production files.',
      'Designed a Gemini-powered tool-use/function-calling AI chat assistant querying live reconciliation data via real backend functions, plus a separate autonomous "Daily Recon Health Agent" using a two-pass maker/checker LLM architecture: one pass drafts findings, a second independently verifies every claim against raw tool output, keeping all arithmetic in deterministic code.',
      'Implemented JWT sliding-session auth with httpOnly cookies, Google OAuth2, and declarative RBAC; authored a security audit that fixed hardcoded credential exposure, added upload validation (magic-byte/zip-bomb checks) across ~20 endpoints, and resolved multi-worker race conditions via cross-process file locking.',
      'Deployed and operated the platform on GCP (Compute Engine + nginx + PostgreSQL + systemd); load-tested to 150 concurrent users at 0% failure rate using Locust.',
    ],
  },
  {
    company: 'CobuildX.ai',
    role: 'AI Engineer',
    dates: 'Apr 2025 — Jun 2026',
    mode: 'Onsite',
    bullets: [
      'Architected and shipped an agentic MCP server on AWS Lambda (JSON-RPC 2.0) exposing 8 Claude.ai-integrated production tools for B2B sales automation: lead CRUD, CRM filtering, ICP scoring (0–100), and role-priority LinkedIn/email enrichment via Apify with Hunter.io fallback chains; designed a stateless EventBridge worker firing 60-second Slack reminder batches.',
      'Delivered truAI, a DPDPA-compliant legal RAG platform (FastAPI + React 18 + LangChain) with dual guardrails: an authority-scoped citation layer and an autonomous GitHub scanner flagging 300+ PII and cookie violation patterns; serves SSE-streamed document Q&A with subsecond first-token latency, reducing manual legal-review effort by ~40%.',
      'Engineered and published truScanner v0.2.10 to PyPI, an open-source static analysis CLI detecting 300+ PII and financial data patterns, with a 3-tier LLM fallback (AWS Bedrock → Ollama → local quantized models) for zero cloud-dependency operation.',
      'Productionized WarpX, an AI collaborative workspace (React 18 + FastAPI + Supabase) featuring a two-level autonomous memory architecture where per-thread LLM summaries propagate to a channel-wide context store, cutting per-message LLM token cost by ~60% via summary caching.',
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  tags: string[];
  link?: string;
  linkLabel?: string;
  featured?: boolean;
  metric?: { value: string; label: string };
};

export const featuredProject: Project = {
  slug: 'ocr-resilience',
  title: 'ocr-resilience',
  tagline: 'Multi-Engine OCR Robustness Pipeline',
  description:
    'An open-source Python package (in active development) combining classical computer-vision preprocessing with a 4-engine OCR ensemble, built on the idea that robustness comes from disagreement-aware fusion, not a bigger model.',
  bullets: [
    'Combined Laplacian blur detection, Sauvola binarization, CLAHE, and deskewing with a quality-aware router and a 4-engine OCR ensemble (Tesseract, EasyOCR, PaddleOCR, RapidOCR), reducing mean character error rate by ~72% vs. the best single engine (0.031 vs. 0.111 CER) across an 11-condition degradation benchmark.',
    'Designed a ROVER-style fusion algorithm (union-find spatial clustering plus confidence-weighted character voting) and validated results with paired-bootstrap statistical significance testing, Cohen’s d, and Bonferroni-corrected comparisons, including honest reporting of ablated components that hurt accuracy.',
    'Built a full CI/CD pipeline (GitHub Actions: 4-version Python test matrix, ruff linting, wheel-build smoke tests, PyPI trusted-publisher release automation) backing a 176-test pytest regression suite with mocked OCR adapters.',
  ],
  tags: ['Python', 'OpenCV', 'Tesseract', 'EasyOCR', 'PaddleOCR', 'RapidOCR', 'GitHub Actions'],
  link: 'https://github.com/Abishek9342/ocr-pipeline',
  linkLabel: 'View on GitHub',
  featured: true,
  metric: { value: '72%', label: 'lower character error rate vs. best single OCR engine' },
};

export const projects: Project[] = [
  {
    slug: 'lead-management',
    title: 'Lead Management MCP Server',
    tagline: 'Agentic B2B sales automation on AWS Lambda',
    description:
      'An MCP server exposing 8 Claude.ai-integrated tools for B2B sales automation (lead CRUD, CRM filtering, ICP scoring, and enrichment), plus a stateless EventBridge worker for scheduled Slack reminders.',
    bullets: [],
    tags: ['AWS Lambda', 'MCP (JSON-RPC 2.0)', 'Claude.ai', 'Apify', 'Hunter.io'],
    link: 'https://github.com/Abishek9342/lead-management',
    linkLabel: 'View on GitHub',
  },
  {
    slug: 'atp-tennis',
    title: 'ATP Tennis Match Predictor',
    tagline: 'ML betting pipeline beating the bookmaker baseline',
    description:
      'End-to-end ATP match prediction on 26 years of data: 70,150 matches, 114 engineered features covering Elo, surface affinity, rolling form, H2H, and momentum.',
    bullets: [],
    tags: ['LightGBM', 'Streamlit', 'SHAP', 'Python'],
    link: 'https://github.com/Abishek9342/tennis-odds',
    linkLabel: 'View on GitHub',
    metric: { value: '0.781', label: 'AUC, beats Pinnacle bookmaker baseline' },
  },
  {
    slug: 'yolo-asca',
    title: 'YOLO-ASCA',
    tagline: 'Construction safety compliance AI',
    description:
      'Fused YOLO object detection with an Attentive BiGRU sequence model for real-time PPE identification and rule-based safety compliance scoring on live construction site feeds. Research accepted and published at WiSPNET 2025, SSN College of Engineering, Chennai.',
    bullets: [],
    tags: ['YOLO', 'Attentive BiGRU', 'WiSPNET 2025'],
    link: 'https://ieeexplore.ieee.org/document/11005349/',
    linkLabel: 'View on IEEE Xplore',
    metric: { value: '92%', label: 'mAP@0.5 on PPE detection classes' },
  },
  {
    slug: 'finance-datasets',
    title: 'Financial Reconciliation Dataset Series',
    tagline: 'Four synthetic datasets, four classical algorithms',
    description:
      'Fuzzy invoice matching, FIFO cascade allocation, meet-in-the-middle subset-sum vendor matching, and multi-format bank statement parsing, each with a from-scratch solver validated against independently verified ground truth.',
    bullets: [],
    tags: ['Python', 'Pandas', 'Classical Algorithms'],
    link: 'https://www.kaggle.com/datasets/abishek9324/vendor-subset-sum-matching',
    linkLabel: 'View on Kaggle',
    metric: { value: '94–100%', label: 'match accuracy across all four datasets' },
  },
  {
    slug: 'smart-leaf',
    title: 'Smart Leaf',
    tagline: 'Deep learning crop diagnostics',
    description:
      'A custom CNN trained on 37,940 leaf images spanning 38 disease classes, deployed as an interactive Streamlit app for real-time crop diagnostics with accuracy/loss trends and a confusion-matrix dashboard.',
    bullets: [],
    tags: ['TensorFlow', 'CNN', 'Streamlit'],
    link: 'https://github.com/Abishek9342/Plants-Disease-Prediction',
    linkLabel: 'View on GitHub',
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C', 'C++'],
  },
  {
    label: 'AI / ML & LLMs',
    items: ['LangChain', 'Anthropic', 'Google Vertex AI', 'AWS Bedrock', 'TensorFlow', 'PyTorch', 'RAG', 'Agents'],
  },
  {
    label: 'Backend',
    items: ['FastAPI', 'Flask', 'Pydantic', 'SQLAlchemy', 'JWT', 'MCP', 'REST'],
  },
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Neo4j', 'Supabase', 'DynamoDB', 'ChromaDB'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS Lambda', 'GCP', 'Docker', 'nginx', 'GitHub Actions', 'Git', 'GitHub', 'Postman'],
  },
];

export const publications = [
  {
    title: 'truScanner v0.2.10',
    detail: 'Open-source static analysis CLI for PII and financial data detection, published to PyPI.',
    link: 'https://pypi.org/project/truscanner',
    linkLabel: 'View on PyPI',
  },
  {
    title: 'YOLO-ASCA: A Rule-Based Framework for Identifying Safety Risks in Construction Management',
    detail: 'WiSPNET 2025, SSN College of Engineering, Chennai. Published on IEEE Xplore.',
    link: 'https://ieeexplore.ieee.org/document/11005349/',
    linkLabel: 'View on IEEE Xplore',
  },
  {
    title: 'Vendor Subset-Sum Matching',
    detail: 'Synthetic financial-reconciliation dataset with a meet-in-the-middle subset-sum solver, published to Kaggle.',
    link: 'https://www.kaggle.com/datasets/abishek9324/vendor-subset-sum-matching',
    linkLabel: 'View on Kaggle',
  },
  {
    title: 'Bank Statement Multi-Format Parsing',
    detail: 'Synthetic financial-reconciliation dataset with a multi-format parser and solver, published to Kaggle.',
    link: 'https://www.kaggle.com/datasets/abishek9324/bank-statement-multiformat-parsing',
    linkLabel: 'View on Kaggle',
  },
];
