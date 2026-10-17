import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { categories } from '../app/model/categories.ts'
import { loadActivities, loadLastUpdated } from './data.ts'
import {
  aboutPage,
  activitiesPage,
  categoryPage,
  homePage,
  sitemap,
} from './pages.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const dataPath = resolve(root, 'app/data/senarai-db.json')
const timestampPath = resolve(root, 'app/data/timestamp.json')

const activities = loadActivities(dataPath)
const lastUpdated = loadLastUpdated(timestampPath)

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

function writePage(path: string, html: string) {
  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, path.slice(1), 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

writePage('/', homePage())
writePage('/activities', activitiesPage(activities))
writePage('/tentang-kami', aboutPage())
for (const category of categories) {
  writePage(`/activities/${category.slug}`, categoryPage(activities, category.slug))
}
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap(lastUpdated, categories.map((category) => category.slug)))
writeFileSync(resolve(dist, 'activities.json'), JSON.stringify(activities))

cpSync(resolve(root, 'public'), dist, { recursive: true })
cpSync(resolve(root, 'site/search.js'), resolve(dist, 'search.js'))

const css = spawnSync(
  'npx',
  ['tailwindcss', '-c', 'tailwind.config.js', '-i', 'site/styles.css', '-o', 'dist/styles.css', '--minify'],
  { cwd: root, stdio: 'inherit' },
)
if (css.status !== 0) {
  throw new Error('Tailwind build failed')
}

console.log(`Wrote ${categories.length + 3} pages to dist/`)
