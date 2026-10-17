import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getKebabCase } from '../app/utils/string.ts'
import { sheetUrl } from './data.ts'
import { activitiesFromCsv } from './sheet.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const source = await fetch(sheetUrl())
if (!source.ok) {
  throw new Error(`Sheet fetch failed: ${source.status} ${source.statusText}`)
}
// A private or moved Sheet answers 200 with an HTML sign-in page.
const contentType = source.headers.get('content-type') ?? ''
if (!contentType.startsWith('text/csv')) {
  throw new Error(`Sheet fetch returned ${contentType || 'no content type'}, not text/csv`)
}

const sheetData = activitiesFromCsv(await source.text())

const sheetName = 'Kegiatan'
writeFileSync(
  resolve(root, 'app/data/senarai-db.json'),
  JSON.stringify([
    {
      id: 'kegiatan',
      name: sheetName,
      slug: getKebabCase(sheetName),
      data: sheetData,
    },
  ]),
)

const date = new Date()
const monthPad = (date.getMonth() + 1).toString().padStart(2, '0')
const datePad = date.getDate().toString().padStart(2, '0')
writeFileSync(
  resolve(root, 'app/data/timestamp.json'),
  JSON.stringify({
    lastUpdated: `${date.getFullYear()}-${monthPad}-${datePad}`,
  }),
)

console.log(`Fetched ${sheetData.length} activities`)
