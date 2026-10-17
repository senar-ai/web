import type { Activities, Activity } from '../app/model/activities.ts'
import { getKebabCase, stripTags, toSnakeCase } from '../app/utils/string.ts'

/** Columns that every Sheet export must have. */
export const REQUIRED_COLUMNS = ['Usia', 'Nama', 'Ringkasan', 'Link'] as const

/**
 * Parse RFC 4180 CSV. Quoted fields can contain commas, newlines, and
 * doubled quotes. Throws on a quote that is not closed or a quote inside
 * an unquoted field.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  let i = 0

  const endField = () => {
    row.push(field)
    field = ''
  }
  const endRow = () => {
    endField()
    rows.push(row)
    row = []
  }

  while (i < text.length) {
    const char = text[i]
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        quoted = false
        const next = text[i + 1]
        if (next !== undefined && next !== ',' && next !== '\n' && next !== '\r') {
          throw new Error(`CSV: unexpected character after closing quote at offset ${i + 1}`)
        }
      } else {
        field += char
      }
      i += 1
      continue
    }
    if (char === '"') {
      if (field.length > 0) {
        throw new Error(`CSV: quote inside an unquoted field at offset ${i}`)
      }
      quoted = true
    } else if (char === ',') {
      endField()
    } else if (char === '\n') {
      endRow()
    } else if (char === '\r') {
      if (text[i + 1] === '\n') i += 1
      endRow()
    } else {
      field += char
    }
    i += 1
  }

  if (quoted) {
    throw new Error('CSV: a quoted field is not closed')
  }
  if (field.length > 0 || row.length > 0) {
    endRow()
  }
  return rows
}

/**
 * Turn the Sheet CSV export into activities. Throws when the export does not
 * have the required columns or has no named activity, so that a bad export
 * never replaces the data files.
 */
export function activitiesFromCsv(csv: string): Activities {
  const [headers, ...rows] = parseCsv(csv)
  if (!headers) {
    throw new Error('Sheet CSV is empty')
  }
  const names = headers.map((header) => header.trim())
  const missing = REQUIRED_COLUMNS.filter((column) => !names.includes(column))
  if (missing.length > 0) {
    throw new Error(`Sheet CSV has no column: ${missing.join(', ')}`)
  }

  const columns = names
    .map((name, index) => ({ key: toSnakeCase(name), index }))
    .filter((column) => column.key.length > 0)

  const activities = rows
    .filter((row) => row.some((cell) => cell.trim().length > 0))
    .map((row, rowIndex) => {
      const record: Record<string, string> = { id: rowIndex.toString() }
      for (const { key, index } of columns) {
        const cell = (row[index] ?? '').trim()
        record[key] = key === 'ringkasan' ? stripTags(cell) : cell
      }
      record.slug = getKebabCase(record.nama)
      record.categorySlug = getKebabCase(record.usia)
      return record as unknown as Activity
    })

  if (!activities.some((activity) => activity.nama)) {
    throw new Error('Sheet CSV has no named activity')
  }
  return activities
}
