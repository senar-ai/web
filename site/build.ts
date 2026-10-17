import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile, optimize } from '@tailwindcss/node'
import { Scanner } from '@tailwindcss/oxide'
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

// Compile the CSS with the Tailwind API. The Tailwind CLI adds a file watcher
// that this build does not need.
const stylesPath = resolve(root, 'site/styles.css')
const compiler = await compile(readFileSync(stylesPath, 'utf8'), {
  base: dirname(stylesPath),
  onDependency: () => {},
})
// site/styles.css sets source(none), so only its @source folders are scanned.
if (compiler.root !== 'none') {
  throw new Error('site/styles.css must import Tailwind with source(none)')
}
const scanner = new Scanner({ sources: compiler.sources })
const css = optimize(compiler.build(scanner.scan()), { minify: true }).code
writeFileSync(resolve(dist, 'styles.css'), css)

console.log(`Wrote ${categories.length + 3} pages to dist/`)
