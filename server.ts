import { createRequestHandlerWithStaticFiles } from '@remix-run/deno'
// Import path interpreted by the Remix compiler
import * as build from '@remix-run/dev/server-build'

const remixHandler = createRequestHandlerWithStaticFiles({
  build,
  mode: Deno.env.get('NODE_ENV'),
  getLoadContext: () => ({}),
})

const port = Number(Deno.env.get('PORT')) || 8000
console.log(`Listening on http://localhost:${port}`)
Deno.serve({ port }, remixHandler)
