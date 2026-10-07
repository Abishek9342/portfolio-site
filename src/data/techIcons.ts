import {
  siPython,
  siTypescript,
  siJavascript,
  siFastapi,
  siReact,
  siVite,
  siTailwindcss,
  siPostgresql,
  siDocker,
  siGooglecloud,
  siLangchain,
  siPytorch,
  siTensorflow,
  siAnthropic,
  siJsonwebtokens,
  siPydantic,
  siSqlalchemy,
  siNginx,
  siGithubactions,
  siSupabase,
  siGit,
  siOllama,
  siPytest,
  siLinux,
  siSap,
  siLocust,
} from 'simple-icons';

export type TechIcon = {
  name: string;
  path: string;
  hex: string;
};

function icon(si: { title: string; path: string; hex: string }): TechIcon {
  return { name: si.title, path: si.path, hex: si.hex };
}

export const techIcons: Record<string, TechIcon> = {
  Python: icon(siPython),
  TypeScript: icon(siTypescript),
  JavaScript: icon(siJavascript),
  FastAPI: icon(siFastapi),
  React: icon(siReact),
  Vite: icon(siVite),
  'Tailwind CSS': icon(siTailwindcss),
  PostgreSQL: icon(siPostgresql),
  Docker: icon(siDocker),
  GCP: icon(siGooglecloud),
  'Google Vertex AI': icon(siGooglecloud),
  LangChain: icon(siLangchain),
  PyTorch: icon(siPytorch),
  TensorFlow: icon(siTensorflow),
  'Anthropic Claude': icon(siAnthropic),
  JWT: icon(siJsonwebtokens),
  Pydantic: icon(siPydantic),
  SQLAlchemy: icon(siSqlalchemy),
  nginx: icon(siNginx),
  'GitHub Actions': icon(siGithubactions),
  Supabase: icon(siSupabase),
  Git: icon(siGit),
  Ollama: icon(siOllama),
  Pytest: icon(siPytest),
  Linux: icon(siLinux),
  'SAP OData': icon(siSap),
  Locust: icon(siLocust),
};
