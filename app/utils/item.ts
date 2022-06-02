import { load } from 'cheerio'
import { getKebabCase, stripTags, toSnakeCase } from './string'

export interface SheetColumn {
  name: string
  index: number
}

export const extractGoogleQuery = (value: string): string => {
  const $ = load(value)
  const links = $('a')
  links.each((_, link): void => {
    const el = $(link)
    const href = el.attr('href')
    const url = new URL(href as string)
    const usp = new URLSearchParams(url.search)
    el.attr('href', usp.get('q'))
  })
  return $('body').html() ?? ''
}

export const itemReducer = (row: string[]) => {
  return (prev: Record<string, number | string>, col: SheetColumn) => {
    const colName = toSnakeCase(col.name)
    let cellValue = row[col.index]
    if (['link'].includes(colName)) {
      cellValue = extractGoogleQuery(cellValue)
    } else if (colName == 'ringkasan') {
      cellValue = stripTags(cellValue)
    }
    prev[colName] = cellValue
    if (colName == 'nama') {
      prev.slug = [getKebabCase(prev.nama as string)].join('-')
    }
    return prev
  }
}
