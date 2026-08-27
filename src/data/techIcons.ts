import {
  siPython,
  siTypescript,
  siJavascript,
  siFastapi,
  siFlask,
  siReact,
  siVite,
  siNextdotjs,
  siTailwindcss,
  siPostgresql,
  siMongodb,
  siNeo4j,
  siDocker,
  siGooglecloud,
  siLangchain,
  siPytorch,
  siTensorflow,
  siAnthropic,
  siGooglegemini,
  siJsonwebtokens,
  siPydantic,
  siSqlalchemy,
  siNginx,
  siGithubactions,
  siC,
  siCplusplus,
  siSupabase,
  siGit,
  siGithub,
  siPostman,
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
  Flask: icon(siFlask),
  React: icon(siReact),
  Vite: icon(siVite),
  'Next.js': icon(siNextdotjs),
  'Tailwind CSS': icon(siTailwindcss),
  PostgreSQL: icon(siPostgresql),
  MongoDB: icon(siMongodb),
  Neo4j: icon(siNeo4j),
  Docker: icon(siDocker),
  GCP: icon(siGooglecloud),
  LangChain: icon(siLangchain),
  PyTorch: icon(siPytorch),
  TensorFlow: icon(siTensorflow),
  Anthropic: icon(siAnthropic),
  'Google Vertex AI': icon(siGooglegemini),
  JWT: icon(siJsonwebtokens),
  Pydantic: icon(siPydantic),
  SQLAlchemy: icon(siSqlalchemy),
  nginx: icon(siNginx),
  'GitHub Actions': icon(siGithubactions),
  C: icon(siC),
  'C++': icon(siCplusplus),
  Supabase: icon(siSupabase),
  Git: icon(siGit),
  GitHub: icon(siGithub),
  Postman: icon(siPostman),
};
