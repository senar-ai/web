import { categories } from '../model/categories'
import { lastUpdated } from '../model/timestamp'

const composeCategoryURL = ({
  domain,
  slug,
}: {
  domain: string
  slug: string
}) => `
<url>
  <loc>${domain}/activities/${slug}</loc>
  <lastmod>${lastUpdated}</lastmod>
  <changefreq>weekly</changefreq>
</url>
`

export const loader = async ({ request }) => {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
  if (!host) {
    throw new Error('Could not determine domain URL.')
  }

  const protocol = host.includes('localhost') ? 'http' : 'https'
  const domain = `${protocol}://${host}`

  // TODO: updated the lastModified logic
  const sitemapString = `
<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${domain}</loc>
      <lastmod>${lastUpdated}</lastmod>
    </url>
    <url>
      <loc>${domain}/tentang-kami</loc>
      <lastmod>${lastUpdated}</lastmod>
    </url>
    <url>
      <loc>${domain}/activities</loc>
      <lastmod>${lastUpdated}</lastmod>
    </url>
    ${categories
      .map(({ slug }) => composeCategoryURL({ domain, slug }))
      .reduce((acc, curr) => acc + curr)}
  </urlset>
  `.trim()
  return new Response(sitemapString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
    },
  })
}
