import { shortlinkLocation } from '../site/redirect.ts'

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname.replace(/\/+$/, '') || '/'
    if (pathname !== '/go' && !pathname.startsWith('/go/')) {
      return new Response('Not Found', { status: 404 })
    }
    const name = pathname === '/go' ? undefined : pathname.slice('/go/'.length)
    const location = shortlinkLocation(name, url.searchParams)
    const target = location.startsWith('/')
      ? new URL(location, url.origin).toString()
      : location
    return Response.redirect(target, 302)
  },
}
