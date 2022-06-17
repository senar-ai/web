import { categories } from '../model/categories'

export const loader = async ({ request }) => {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
  if (!host) {
    throw new Error('Could not determine domain URL.')
  }

  // TODO: updated the lastModified logic
  const lastModified = '2022-06-17'
  const rssString = `
<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>http://senar.ai</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      </url>
      ${categories.map(
        (category) => `
      <url>
      <loc>http://senar.ai/activities/${category.slug}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
    </url>
    `
      )}
</urlset>
  `.trim()

  return new Response(rssString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
    },
  })
}
