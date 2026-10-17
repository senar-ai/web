const ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function escapeHtml(value: string | number | undefined | null): string {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ESCAPE[char])
}

export function classNames(
  ...names: Array<string | false | undefined | null>
): string {
  return names.filter(Boolean).join(' ')
}

export function icon(set: string, id: string, className: string): string {
  return `<svg fill="currentColor" class="${escapeHtml(className)}" aria-hidden="true"><use href="/images/${escapeHtml(set)}.svg#${escapeHtml(id)}"></use></svg>`
}

export function externalHref(link: string): string {
  if (!link) return ''
  if (link.startsWith('http') || link.startsWith('/')) return link
  return `http://${link}`
}

const GTAG = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-47CSFLV9JK');`

export function document(options: {
  title: string
  description: string
  path: string
  body: string
}): string {
  const title = escapeHtml(options.title)
  const description = escapeHtml(options.description)
  const image = 'https://senar.ai/images/preview.png'
  const canonical = `https://senar.ai${options.path === '/' ? '' : options.path}`
  return `<!doctype html>
<html lang="en" class="h-full bg-gray-100">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@ainunnajib">
<meta name="twitter:site" content="@ainunnajib">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
<link rel="icon" href="/favicon.ico">
<link rel="stylesheet" href="/styles.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-47CSFLV9JK"></script>
<script>${GTAG}</script>
</head>
<body class="h-full">
${options.body}
<script src="/search.js" defer></script>
</body>
</html>
`
}
