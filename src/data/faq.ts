import { datasets, experience, profile, skillGroups, whatsappUrl } from './content';

// Buddy's answer bank. Every answer uses only facts already on the site (content.ts) or the
// resume; never add numbers or claims that aren't on record there.
//
// Each entry:
//   id        stable key, used for follow-up links
//   q         the question shown on suggestion chips (omit for small talk that shouldn't be suggested)
//   keywords  words that point to this entry (matched in components/buddyBrain.ts)
//   answer    the reply
//   next      up to 3 follow-up ids, suggested after this answer (falls back to the same topic)
//   patterns  optional regexes for casual messages ("hiii", "how are you"); checked before keywords

export type Topic = 'about' | 'pothys' | 'cobuild' | 'ai' | 'skills' | 'education' | 'opensource' | 'contact' | 'small';

export type Faq = {
  id: string;
  topic: Topic;
  q?: string;
  keywords: string[];
  answer: string;
  next?: string[];
  patterns?: RegExp[];
};

const plain = (s: string) => s.replace(/\*\*/g, '');
const project = (title: string) => experience.flatMap((j) => j.projects).find((p) => p.title.startsWith(title))!;
const skills = (label: string) => skillGroups.find((g) => g.label === label)?.items.join(', ') ?? '';
const dataset = (title: string) => datasets.find((d) => d.title.startsWith(title))!;
// Every answer that shares contact details uses this block; the WhatsApp link renders as a button.
const contactLine = `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}\nWhatsApp: ${whatsappUrl}`;

export const FALLBACK_ANSWER = `Hmm, I don't have an answer for that one yet. Try one of the questions below, or ask Abishek directly:\nEmail: ${profile.email}\nWhatsApp: ${whatsappUrl}`;

// Shown when the chat opens and whenever Buddy has nothing more specific to suggest.
export const STARTERS = ['about', 'pothys', 'ai-work', 'truscanner', 'contact'];

export const faqs: Faq[] = [
  // ---------- About ----------
  {
    id: 'about',
    topic: 'about',
    q: 'Who is Abishek?',
    keywords: ['who', 'abishek', 'introduce', 'introduction', 'summary', 'background', 'overview'],
    answer:
      "Abishek is an AI engineer with about 1.5 years of experience building production LLM systems and data-heavy backends. Right now he builds and runs the finance operations platform at Pothys Retail. Before that he shipped four AI products at CobuildX.ai, including a Claude-integrated MCP server and an open-source package on PyPI.",
    next: ['role', 'specialise', 'ship'],
  },
  {
    id: 'role',
    topic: 'about',
    q: "What's his current role?",
    keywords: ['current', 'currently', 'role', 'title', 'position', 'designation', 'now'],
    answer: 'He is an AI Engineer at Pothys Retail Pvt Ltd, since July 2026.',
    next: ['pothys', 'prpl', 'years'],
  },
  {
    id: 'years',
    topic: 'about',
    q: 'How much experience does he have?',
    keywords: ['experience', 'years', 'senior', 'junior', 'fresher', 'long', 'much'],
    answer:
      'About 1.5 years of professional experience, all as an AI engineer: CobuildX.ai from April 2025 to June 2026, then Pothys Retail from July 2026 to now.',
    next: ['cobuild', 'pothys', 'education'],
  },
  {
    id: 'specialise',
    topic: 'about',
    q: 'What does he specialise in?',
    keywords: ['specialise', 'specialize', 'specialty', 'speciality', 'focus', 'strength', 'strengths', 'expert'],
    answer:
      'Production LLM systems: AI agents with function calling, RAG, MCP servers, plus the data-heavy backends around them. A lot of his current work is finance automation: reconciliation, GST compliance and reporting.',
    next: ['ai-work', 'agents', 'finance-domain'],
  },
  {
    id: 'ship',
    topic: 'about',
    q: 'What does "ship, not just demos" mean?',
    keywords: ['ship', 'demos', 'demo', 'production', 'shipped'],
    answer:
      "It means his work runs for real users, not just as prototypes. His finance platform is used daily by Pothys Retail's finance team, truScanner is published on PyPI, and he delivered four AI SaaS products at CobuildX.ai.",
    next: ['prpl', 'truscanner', 'testing'],
  },
  {
    id: 'finance-domain',
    topic: 'about',
    q: 'Does he know the finance domain?',
    keywords: ['domain', 'accounting', 'accounts', 'payable', 'business'],
    answer:
      'Yes. At Pothys he builds reconciliation, GST compliance, accounts payable and bank statement tools used daily by the finance team, and he integrates with SAP. Two of his Kaggle datasets (invoice reconciliation and vendor payment matching) also come from this area.',
    next: ['gst', 'sap', 'kaggle'],
  },

  // ---------- Pothys Retail ----------
  {
    id: 'pothys',
    topic: 'pothys',
    q: 'What does he build at Pothys?',
    keywords: ['pothys', 'retail', 'company', 'job', 'employer', 'workplace', 'office', 'work', 'working', 'works'],
    answer: `He built and owns the company's finance automation platform, with around 20 reconciliation and GST modules used daily by the finance team. His projects there: ${experience[0].projects.map((p) => p.title).join(', ')}.`,
    next: ['prpl', 'gst', 'finance-assistant'],
  },
  {
    id: 'prpl',
    topic: 'pothys',
    q: 'What is the PRPL platform?',
    keywords: ['prpl', 'platform', 'automation', 'modules', 'module'],
    answer: plain(project('PRPL').description),
    next: ['prpl-stack', 'testing', 'gst'],
  },
  {
    id: 'prpl-stack',
    topic: 'pothys',
    q: 'What is the PRPL platform built with?',
    keywords: ['built', 'with', 'architecture', 'stack', 'hosted', 'host', 'runs'],
    answer:
      'FastAPI and PostgreSQL on the backend, React 19 with TypeScript on the frontend, running in production on Google Cloud. He owns the architecture, both ends, role-based access control and the deployment.',
    next: ['testing', 'security', 'backend'],
  },
  {
    id: 'testing',
    topic: 'pothys',
    q: 'How does he test his code?',
    keywords: ['test', 'tests', 'testing', 'tested', 'quality', 'pytest', 'locust', 'coverage', 'automated'],
    answer: `The PRPL platform has 500+ automated tests. His testing tools: ${skills('Testing')} (Locust for load testing).`,
    next: ['security', 'prpl-stack', 'safe-ai'],
  },
  {
    id: 'security',
    topic: 'pothys',
    q: 'Does he handle security?',
    keywords: ['security', 'secure', 'access', 'rbac', 'permissions', 'auth', 'authentication', 'hardening'],
    answer:
      'Yes. On the PRPL platform he built role-based access control and did the security hardening. His email integration uses certificate-based authentication with Microsoft 365, and he works with OAuth 2.0 and JWT.',
    next: ['email', 'testing', 'safe-ai'],
  },
  {
    id: 'gst',
    topic: 'pothys',
    q: 'Tell me about the GST reconciliation engine',
    keywords: ['gst', 'gstr', '2b', 'itc', 'input', 'tax', 'credit', 'compliance', 'vendor', 'notices'],
    answer: plain(project('GST Input Tax Credit').description),
    next: ['sap', 'finance-domain', 'bank'],
  },
  {
    id: 'sap',
    topic: 'pothys',
    q: 'Has he worked with SAP?',
    keywords: ['sap', 'odata', 'erp', 'integration', 'integrate'],
    answer:
      'Yes. His GST reconciliation engine matches SAP purchase records against GSTR-2B, and it connects to the live SAP vendor master over OData to automate vendor compliance notices.',
    next: ['gst', 'email', 'backend'],
  },
  {
    id: 'finance-assistant',
    topic: 'pothys',
    q: 'How does his finance AI assistant work?',
    keywords: ['finance', 'assistant', 'conversational', 'chat', 'chatbot', 'function', 'calling'],
    answer: plain(project('LLM Finance Assistant').description),
    next: ['maker-checker', 'safe-ai', 'agents'],
  },
  {
    id: 'maker-checker',
    topic: 'pothys',
    q: 'What is a maker/checker agent?',
    keywords: ['maker', 'checker', 'verify', 'verifies', 'verification', 'second', 'review'],
    answer:
      'One AI model drafts the findings (the maker), and a second one independently checks them against the source data (the checker) before anything is reported. He built this into the scheduled agents on the finance platform.',
    next: ['safe-ai', 'agents', 'finance-assistant'],
  },
  {
    id: 'email',
    topic: 'pothys',
    q: 'What did he build with Microsoft 365?',
    keywords: ['microsoft', '365', 'm365', 'graph', 'outlook', 'enterprise', 'delivery', 'automation'],
    answer: plain(project('Enterprise Email').description),
    next: ['security', 'analytics', 'backend'],
  },
  {
    id: 'analytics',
    topic: 'pothys',
    q: 'What are the accountant performance analytics?',
    keywords: ['accountant', 'accountants', 'analytics', 'performance', 'ranking', 'rankings', 'ageing', 'tracking'],
    answer: plain(project('AP Accountant').description),
    next: ['finance-domain', 'email', 'ai-work'],
  },
  {
    id: 'bank',
    topic: 'pothys',
    q: 'What is the bank statement engine?',
    keywords: ['bank', 'statement', 'statements', 'parser', 'parsers', 'formats', 'mapping'],
    answer: plain(project('Bank Statement').description),
    next: ['safe-ai', 'gst', 'python'],
  },

  // ---------- CobuildX.ai ----------
  {
    id: 'cobuild',
    topic: 'cobuild',
    q: 'What did he do at CobuildX.ai?',
    keywords: ['cobuildx', 'cobuild', 'previous', 'before', 'past', 'earlier', 'startup', 'last'],
    answer: `He was an AI Engineer at CobuildX.ai from April 2025 to June 2026 and delivered four AI products: ${experience[1].projects.map((p) => p.title).join(', ')}.`,
    next: ['mcp-server', 'truai', 'truscanner'],
  },
  {
    id: 'mcp-server',
    topic: 'cobuild',
    q: 'Tell me about his MCP server',
    keywords: ['mcp', 'server', 'lead', 'leads', 'sales', 'crm', 'outreach', 'slack', 'b2b'],
    answer: `${plain(project('Lead Management').description)} Code: ${project('Lead Management').link}`,
    next: ['what-mcp', 'claude', 'truai'],
  },
  {
    id: 'what-mcp',
    topic: 'cobuild',
    q: 'What is MCP?',
    keywords: ['protocol', 'context', 'meaning', 'mean', 'explain', 'exactly', 'definition', 'stand', 'stands'],
    answer:
      'MCP (Model Context Protocol) is an open standard that lets AI models like Claude call outside tools and data. Abishek built an MCP server on AWS Lambda that gave Claude 8 tools for B2B sales work.',
    next: ['mcp-server', 'claude', 'agents'],
  },
  {
    id: 'truai',
    topic: 'cobuild',
    q: 'What is truAI?',
    keywords: ['truai', 'legal', 'law', 'dpdpa', 'citations', 'statutes'],
    answer: plain(project('truAI').description),
    next: ['rag', 'truscanner', 'warpx'],
  },
  {
    id: 'truscanner',
    topic: 'cobuild',
    q: 'Tell me about truScanner',
    keywords: ['truscanner', 'scanner', 'scan', 'pii', 'cli', 'privacy'],
    answer: `${plain(project('truScanner').description)} ${project('truScanner').link}`,
    next: ['offline', 'opensource', 'github'],
  },
  {
    id: 'warpx',
    topic: 'cobuild',
    q: 'What is WarpX?',
    keywords: ['warpx', 'warp', 'workspace', 'collaborative', 'memory'],
    answer: `WarpX is an AI collaborative workspace. ${plain(project('WarpX').description)}`,
    next: ['token-cost', 'truai', 'ai-work'],
  },
  {
    id: 'token-cost',
    topic: 'cobuild',
    q: 'How did he cut LLM token costs by 60%?',
    keywords: ['token', 'tokens', 'cost', 'costs', 'cheaper', 'caching', 'cache', 'optimise', 'optimize', '60'],
    answer:
      "In WarpX he designed a two-level memory: each thread gets summarised into a channel-wide context store, and those summaries are cached. The assistant keeps long-term context without resending everything, which cut per-message token cost by about 60%.",
    next: ['warpx', 'rag', 'ai-tools'],
  },

  // ---------- AI ----------
  {
    id: 'ai-work',
    topic: 'ai',
    q: 'What AI work has he done?',
    keywords: ['ai', 'llm', 'llms', 'genai', 'generative', 'artificial', 'intelligence', 'ml', 'machine', 'learning'],
    answer:
      'Plenty: a finance assistant using function calling over live data, scheduled agents with a maker/checker check, a legal RAG platform (truAI), an MCP server exposing tools to Claude, AI-assisted bank statement mapping, a two-level LLM memory that cut token cost ~60%, and an offline-capable PII scanner (truScanner).',
    next: ['agents', 'rag', 'claude'],
  },
  {
    id: 'agents',
    topic: 'ai',
    q: 'Has he built AI agents?',
    keywords: ['agent', 'agents', 'agentic', 'autonomous', 'tools', 'workflows'],
    answer:
      'Yes. On the finance platform he built scheduled agents, including a maker/checker agent where a second model verifies the first one\'s findings. At CobuildX he built an MCP server that let Claude act as a sales agent with 8 tools.',
    next: ['maker-checker', 'mcp-server', 'safe-ai'],
  },
  {
    id: 'rag',
    topic: 'ai',
    q: 'Has he built RAG systems?',
    keywords: ['rag', 'retrieval', 'augmented', 'embeddings', 'vector', 'search', 'chromadb'],
    answer:
      'Yes, truAI: a DPDPA-compliant legal research platform with citation-grounded answers that separate binding statutes from non-binding guidance, streaming the first words in under a second. He works with LangChain, vector embeddings and ChromaDB.',
    next: ['truai', 'ai-tools', 'token-cost'],
  },
  {
    id: 'claude',
    topic: 'ai',
    q: 'Does he work with Claude?',
    keywords: ['claude', 'anthropic'],
    answer:
      'Yes. The Anthropic Claude API is part of his AI stack, and at CobuildX he built an MCP server on AWS Lambda that exposed 8 tools to Claude for B2B sales automation.',
    next: ['mcp-server', 'what-mcp', 'ai-tools'],
  },
  {
    id: 'ai-tools',
    topic: 'ai',
    q: 'Which AI tools and frameworks does he use?',
    keywords: ['frameworks', 'framework', 'langchain', 'bedrock', 'vertex', 'pytorch', 'tensorflow', 'ollama', 'models'],
    answer: `His AI and LLM toolkit: ${skills('AI & LLMs')}.`,
    next: ['rag', 'offline', 'python'],
  },
  {
    id: 'offline',
    topic: 'ai',
    q: 'Can his AI tools run offline?',
    keywords: ['offline', 'local', 'locally', 'quantised', 'quantized', 'private', 'without', 'internet'],
    answer:
      'truScanner can. It has a three-tier LLM fallback: AWS Bedrock in the cloud, Ollama on your machine, and local quantised models, so it still works with no internet connection.',
    next: ['truscanner', 'ai-tools', 'opensource'],
  },
  {
    id: 'safe-ai',
    topic: 'ai',
    q: 'How does he keep AI reliable in production?',
    keywords: ['reliable', 'reliability', 'safe', 'safety', 'trust', 'hallucination', 'hallucinations', 'guardrails', 'confirm', 'approval', 'human'],
    answer:
      'He keeps a human or a second check in the loop. His finance assistant only runs actions after the user confirms them, a maker/checker agent verifies AI findings against source data, AI-proposed bank statement mappings are validated on the full file and approved by a user, and truAI grounds answers in citations.',
    next: ['maker-checker', 'finance-assistant', 'bank'],
  },

  // ---------- Skills ----------
  {
    id: 'skills',
    topic: 'skills',
    q: "What's his tech stack?",
    keywords: ['skills', 'skill', 'stack', 'tech', 'technologies', 'technology', 'tools', 'expertise', 'know'],
    answer: `Languages: ${skills('Languages')}\nAI & LLMs: ${skills('AI & LLMs')}\nBackend: ${skills('Backend & APIs')}\nFrontend: ${skills('Frontend')}\nDatabases: ${skills('Databases')}\nCloud & DevOps: ${skills('Cloud & DevOps')}`,
    next: ['python', 'cloud', 'ai-tools'],
  },
  {
    id: 'python',
    topic: 'skills',
    q: 'Which programming languages does he use?',
    keywords: ['python', 'typescript', 'javascript', 'sql', 'language', 'languages', 'programming', 'code', 'coding'],
    answer: `${skills('Languages')}. Python for the backends, data work and AI; TypeScript with React for the frontends.`,
    next: ['backend', 'frontend', 'databases'],
  },
  {
    id: 'backend',
    topic: 'skills',
    q: 'What backend technologies does he use?',
    keywords: ['backend', 'api', 'apis', 'fastapi', 'rest', 'server', 'pydantic', 'sqlalchemy', 'jwt'],
    answer: `${skills('Backend & APIs')}. His main framework is FastAPI.`,
    next: ['databases', 'prpl-stack', 'security'],
  },
  {
    id: 'frontend',
    topic: 'skills',
    q: 'Does he do frontend work too?',
    keywords: ['frontend', 'front', 'react', 'ui', 'vite', 'tailwind', 'web', 'website', 'fullstack', 'full'],
    answer: `Yes, he's full-stack. Frontend: ${skills('Frontend')}. He built the PRPL platform's React 19 frontend, and this portfolio too.`,
    next: ['backend', 'prpl-stack', 'skills'],
  },
  {
    id: 'databases',
    topic: 'skills',
    q: 'Which databases has he used?',
    keywords: ['database', 'databases', 'db', 'postgres', 'postgresql', 'dynamodb', 'supabase', 'storage'],
    answer: `${skills('Databases')}. PostgreSQL is the main one on the finance platform.`,
    next: ['backend', 'cloud', 'rag'],
  },
  {
    id: 'cloud',
    topic: 'skills',
    q: 'Which cloud platforms does he use?',
    keywords: ['cloud', 'aws', 'gcp', 'google', 'lambda', 'devops', 'docker', 'deploy', 'deployment', 'nginx', 'linux'],
    answer: `${skills('Cloud & DevOps')}. His finance platform runs in production on Google Cloud, and his CobuildX projects ran on AWS Lambda.`,
    next: ['prpl-stack', 'mcp-server', 'testing'],
  },

  // ---------- Education & research ----------
  {
    id: 'education',
    topic: 'education',
    q: 'Where did he study?',
    keywords: ['education', 'college', 'degree', 'university', 'study', 'studied', 'btech', 'b', 'tech', 'mepco', 'qualification'],
    answer: 'He has a B.Tech in Artificial Intelligence and Data Science from Mepco Schlenk Engineering College.',
    next: ['graduated', 'paper', 'kaggle'],
  },
  {
    id: 'graduated',
    topic: 'education',
    q: 'When did he graduate?',
    keywords: ['graduate', 'graduated', 'graduation', 'passed', 'batch', 'year', 'completed'],
    answer: 'He studied at Mepco Schlenk Engineering College from October 2021 to April 2025, and joined CobuildX.ai the same month he graduated.',
    next: ['cobuild', 'paper', 'years'],
  },
  {
    id: 'paper',
    topic: 'education',
    q: 'Has he published any research?',
    keywords: ['publication', 'publications', 'paper', 'papers', 'research', 'ieee', 'published', 'journal', 'conference'],
    answer:
      'Yes: "YOLO-ASCA: A Rule-Based Framework for Identifying Safety Risks in Construction Management", presented at WiSPNET 2025 at SSN College of Engineering, Chennai, and published on IEEE Xplore: https://ieeexplore.ieee.org/document/11005349/',
    next: ['yolo', 'kaggle', 'opensource'],
  },
  {
    id: 'yolo',
    topic: 'education',
    q: 'What is YOLO-ASCA about?',
    keywords: ['yolo', 'asca', 'construction', 'safety', 'risks', 'wispnet', 'vision'],
    answer:
      "As the title says, it's a rule-based framework for identifying safety risks in construction management. It was presented at WiSPNET 2025 and is on IEEE Xplore, where you can read the full paper: https://ieeexplore.ieee.org/document/11005349/",
    next: ['paper', 'education', 'ai-work'],
  },

  // ---------- Open source & Kaggle ----------
  {
    id: 'opensource',
    topic: 'opensource',
    q: 'Does he contribute to open source?',
    keywords: ['open', 'source', 'opensource', 'pypi', 'package', 'library', 'contribute', 'contributor'],
    answer:
      "Yes. He published truScanner on PyPI, an open-source CLI that finds personal and financial data in codebases: https://pypi.org/project/truscanner. He also shares public datasets on Kaggle.",
    next: ['truscanner', 'github', 'kaggle'],
  },
  {
    id: 'github',
    topic: 'opensource',
    q: "What's his GitHub?",
    keywords: ['github', 'repo', 'repos', 'repository', 'repositories', 'git'],
    answer: `${profile.github}. His Lead Management MCP server code is there too: https://github.com/Abishek9342/lead-management`,
    next: ['mcp-server', 'opensource', 'kaggle'],
  },
  {
    id: 'kaggle',
    topic: 'opensource',
    q: 'What has he published on Kaggle?',
    keywords: ['kaggle', 'dataset', 'datasets', 'data', 'downloads'],
    answer: `4 datasets with 500+ downloads:\n${datasets.map((d) => `· ${d.title}`).join('\n')}\nAll at ${profile.kaggle}`,
    next: ['atlas', 'invoice', 'subset-sum'],
  },
  {
    id: 'atlas',
    topic: 'opensource',
    q: 'What is the Agent Failure Atlas?',
    keywords: ['atlas', 'failure', 'failures', 'benchmark', 'trajectories', 'taxonomy'],
    answer: `${dataset('Agent Failure Atlas').detail} ${dataset('Agent Failure Atlas').link}`,
    next: ['agents', 'kaggle', 'invoice'],
  },
  {
    id: 'invoice',
    topic: 'opensource',
    q: 'Tell me about the invoice reconciliation dataset',
    keywords: ['invoice', 'invoices', 'fuzzy', 'matching', 'payable'],
    answer: `Fuzzy Invoice Reconciliation: ${dataset('Fuzzy Invoice').detail} ${dataset('Fuzzy Invoice').link}`,
    next: ['subset-sum', 'finance-domain', 'gst'],
  },
  {
    id: 'subset-sum',
    topic: 'opensource',
    q: 'What is the vendor subset-sum dataset?',
    keywords: ['subset', 'sum', 'meet', 'middle', 'payments', 'precision', 'recall'],
    answer: `Vendor Subset-Sum Matching: ${dataset('Vendor Subset').detail} ${dataset('Vendor Subset').link}`,
    next: ['invoice', 'student', 'finance-domain'],
  },
  {
    id: 'student',
    topic: 'opensource',
    q: 'What is the student placement dataset?',
    keywords: ['student', 'students', 'placement', 'cgpa', 'prediction'],
    answer: `Student Performance & Placement Prediction: ${dataset('Student').detail} ${dataset('Student').link}`,
    next: ['kaggle', 'atlas', 'education'],
  },

  // ---------- Contact & hiring ----------
  {
    id: 'contact',
    topic: 'contact',
    q: 'How do I contact him?',
    keywords: ['contact', 'email', 'mail', 'reach', 'connect', 'message', 'talk', 'whatsapp', 'phone', 'number', 'call'],
    answer: `Here's how to reach him:\n${contactLine}`,
    next: ['hire', 'resume', 'linkedin'],
  },
  {
    id: 'hire',
    topic: 'contact',
    q: 'Is he open to new opportunities?',
    keywords: ['hire', 'hiring', 'recruit', 'recruiter', 'opening', 'opportunity', 'opportunities', 'interview', 'available', 'availability', 'roles', 'join', 'freelance'],
    answer: `For roles and opportunities, the best way is to reach him directly:\n${contactLine}`,
    next: ['resume', 'contact', 'about'],
  },
  {
    id: 'resume',
    topic: 'contact',
    q: 'Can I see his resume?',
    keywords: ['resume', 'cv', 'download', 'pdf', 'biodata'],
    answer: 'Sure! Use the "Download resume" button at the top of the page, or type "resume" in the terminal.',
    next: ['contact', 'skills', 'years'],
  },
  {
    id: 'linkedin',
    topic: 'contact',
    q: "What's his LinkedIn?",
    keywords: ['linkedin', 'social', 'profile', 'profiles'],
    answer: `Here you go: ${profile.linkedin}`,
    next: ['github', 'kaggle', 'contact'],
  },
  {
    id: 'personal',
    topic: 'contact',
    keywords: ['salary', 'ctc', 'pay', 'compensation', 'notice', 'period', 'relocate', 'relocation', 'location', 'located', 'based', 'live', 'lives', 'city', 'age', 'married'],
    answer: `That's one to ask him directly:\n${contactLine}`,
    next: ['contact', 'hire', 'resume'],
  },

  // ---------- Small talk (never suggested) ----------
  {
    id: 'hello',
    topic: 'small',
    keywords: ['hi', 'hii', 'hello', 'helo', 'hey', 'heyy', 'hai', 'hlo', 'yo', 'hola', 'namaste', 'vanakkam', 'sup', 'morning', 'evening', 'afternoon'],
    patterns: [/^(hi+|hey+|he+l+o+|hai+|hlo+|yo+|hola|namaste|vanakkam|sup|wa+s+u+p+|good (morning|afternoon|evening|day))[\s!.,?]*(buddy|there|abishek)?[\s!.,?]*$/],
    answer: "Hey there! I'm Buddy. I can tell you about Abishek's work, projects, skills, research or how to reach him. Pick a question below or type your own.",
  },
  {
    id: 'how-are-you',
    topic: 'small',
    keywords: [],
    patterns: [/\bhow (are|r) (you|u)\b/, /\bhow('?s| is) (it going|everything|life)\b/, /\bhow (are|r) things\b/, /\bhow do you do\b/, /^what'?s up\b/, /^wassup\b/],
    answer: "I'm doing great, thanks for asking! I'm here to tell you all about Abishek. What would you like to know?",
  },
  {
    id: 'what-can-you-do',
    topic: 'small',
    keywords: ['help'],
    patterns: [/\bwhat (can|do) (you|u) (do|know|answer|tell)\b/, /\bhow (can|do) (you|u) help\b/, /^help\b/, /\bwhat should i ask\b/],
    answer: "I can answer questions about Abishek: his work at Pothys and CobuildX.ai, his projects, AI experience, tech stack, education, research, open-source work and Kaggle datasets, plus how to contact him. Try one of the questions below!",
  },
  {
    id: 'buddy',
    topic: 'small',
    q: 'Who are you, Buddy?',
    keywords: ['buddy', 'you', 'bot', 'chatbot', 'real', 'human', 'robot', 'yourself', 'name'],
    patterns: [/\bwho (are|r) (you|u)\b/, /\bwhat('?s| is) your name\b/, /\bare (you|u) (a )?(bot|robot|human|real|ai)\b/],
    answer:
      "I'm Buddy, Abishek's little helper on this site. I answer from what's on his portfolio, so for anything I don't know, the best bet is to ask him directly.",
  },
  {
    id: 'who-made-you',
    topic: 'small',
    keywords: [],
    patterns: [/\bwho (made|built|created|designed|coded) (you|u|this|buddy)\b/],
    answer: 'Abishek built me right into his portfolio, along with the interactive terminal at the top. Everything I say comes from his site content.',
  },
  {
    id: 'ack',
    topic: 'small',
    keywords: [],
    patterns: [/^(ok+|okay+|k+|kk+|cool+|nice+|great|awesome|got it|alright|fine|hmm+|lol+|ha(ha)+|wow+|yes+|yeah|yep|sure|no+|nope|interesting)[\s!.,]*$/],
    answer: 'Anything else you would like to know about Abishek? Here are a few ideas:',
  },
  {
    id: 'thanks',
    topic: 'small',
    keywords: ['thanks', 'thank', 'thx', 'helpful'],
    patterns: [/^(thanks?|thank (you|u)|thx|ty|tysm)\b/, /\bthank(s| you| u)\b/],
    answer: `Anytime! If you'd like to talk to Abishek himself:\nEmail: ${profile.email}\nWhatsApp: ${whatsappUrl}`,
  },
  {
    id: 'bye',
    topic: 'small',
    keywords: ['bye', 'goodbye'],
    patterns: [/\b(bye+|goodbye|see (you|ya|u)|cya|good night|take care)\b/],
    answer: `Bye, and thanks for stopping by! If you'd like to reach Abishek later:\nEmail: ${profile.email}\nWhatsApp: ${whatsappUrl}`,
  },
];

export const faqById = new Map(faqs.map((f) => [f.id, f]));
