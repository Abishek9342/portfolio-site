import { Readable } from 'node:stream'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// In `npm run dev`, serve /api/buddy from the Netlify function source so Buddy works on
// localhost too. ANTHROPIC_API_KEY is read from .env.local (gitignored). Production uses
// the real Netlify function (routed by its `config.path`).
function buddyDevApi(): Plugin {
  return {
    name: 'buddy-dev-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      if (env.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY
      process.env.BUDDY_LOCAL = '1' // Netlify Blobs isn't available locally; skip the daily cap

      server.middlewares.use('/api/buddy', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const mod = await server.ssrLoadModule('/netlify/functions/buddy.mts')
          const response: Response = await mod.default(
            new Request('http://localhost/api/buddy', {
              method: req.method,
              headers: { 'Content-Type': 'application/json' },
              body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
            }),
          )
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          if (response.body) Readable.fromWeb(response.body as never).pipe(res)
          else res.end()
        } catch (error) {
          server.config.logger.error(String(error))
          res.statusCode = 500
          res.end('Buddy dev API failed')
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), buddyDevApi()],
})
