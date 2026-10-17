import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isAllEmptyString, getKebabCase } from '../app/utils/string.ts'
import { rowReducer } from '../app/utils/google-sheets.ts'
import { sheetUrl } from './data.ts'

function parseCSV(csv: string): string[][] {
  const lines = csv.trim().split('\n')
  const result: string[][] = []

  for (const line of lines) {
    const row: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"' && (i === 0 || line[i - 1] === ',')) {
        inQuotes = true
      } else if (
        char === '"' &&
        inQuotes &&
        (i === line.length - 1 || line[i + 1] === ',')
      ) {
        inQuotes = false
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    row.push(current.trim())
    result.push(row)
  }

  return result
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const source = await fetch(sheetUrl())
if (!source.ok) {
  throw new Error(`Sheet fetch failed: ${source.status} ${source.statusText}`)
}

const rows = parseCSV(await source.text())
const headers = rows[0]
const dataRows = rows.slice(1).filter((row) => !isAllEmptyString(row))
if (!headers || dataRows.length === 0) {
  throw new Error('Sheet response has no activity rows. Refusing to replace the data files.')
}

const sheetColumns = headers
  .map((header, index) => ({ name: header, index }))
  .filter((col) => col.name.trim().length !== 0)

const sheetData = dataRows.map((row, rowIndex) => {
  return sheetColumns.reduce(rowReducer(row), { id: rowIndex.toString() })
})

if (sheetData.length === 0) {
  throw new Error('Parsed sheet is empty. Refusing to replace the data files.')
}

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
