import { shortlinks, type ShortlinkName } from './data.ts'

const NAMED = new Set<string>(Object.keys(shortlinks))

export function isShortlinkName(name: string): name is ShortlinkName {
  return NAMED.has(name)
}

/**
 * Keep the destination query and fragment. Append the incoming query as
 * query parameters, never after the fragment.
 * `/go` and unknown names go to `/` with no query string.
 */
export function shortlinkLocation(
  name: string | undefined,
  incoming: URLSearchParams,
): string {
  if (!name || !isShortlinkName(name)) return '/'

  const destination = new URL(shortlinks[name])
  for (const [key, value] of incoming) {
    destination.searchParams.append(key, value)
  }
  return destination.toString()
}
