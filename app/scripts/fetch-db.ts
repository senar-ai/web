import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import fetch from 'cross-fetch'
import { isAllEmptyString, getKebabCase, toSecond } from '../utils/string'
import { rowReducer } from '../utils/google-sheets'

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
      } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i + 1] === ',')) {
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

export async function fetchDatabase() {
  const source = await fetch('https://docs.google.com/spreadsheets/d/1-nl7RHGsQwF12GzGfj22YJiqlwLjm1ix-hqcR1mJxWs/export?format=csv&gid=0')
  const csvText = await source.text()
  
  const rows = parseCSV(csvText)
  if (rows.length === 0) {
    throw new Error('No data found in CSV')
  }
  
  const headers = rows[0]
  const dataRows = rows.slice(1).filter(row => !isAllEmptyString(row))
  
  const sheetColumns = headers.map((header, index) => ({
    name: header,
    index: index,
  })).filter((col) => col.name.trim().length !== 0)
  
  const sheetData = dataRows.map((row, rowIndex) => {
    return sheetColumns.reduce(rowReducer(row), {
      id: rowIndex.toString(),
    })
  })

  const sheetName = 'Kegiatan'
  const sheetList = [{
    id: 'kegiatan',                    // Raw ID (mimicking old sheet ID)
    name: sheetName,                   // Raw sheet name
    slug: getKebabCase(sheetName),     // Only slug gets kebab-cased
    data: sheetData,
  }]

  fs.writeFileSync(
    path.resolve(__dirname, '../data/senarai-db.json'),
    JSON.stringify(sheetList)
  )
  const date = new Date()
  const monthPad = (date.getMonth() + 1).toString().padStart(2, '0')
  const datePad = date.getDate().toString().padStart(2, '0')
  fs.writeFileSync(
    path.resolve(__dirname, '../data/timestamp.json'),
    JSON.stringify({
      lastUpdated: date.getFullYear() + '-' + monthPad + '-' + datePad,
    })
  )
}

;(function fetchSenarai() {
  const start = process.hrtime()
  const spinner = ora(
    `${chalk.yellowBright('Fetching Senarai database...')}`
  ).start()
  fetchDatabase()
    .then(() => {
      const end = `${toSecond(process.hrtime(start))} seconds`
      spinner.succeed(
        `Fetching Senarai database is done in ${chalk.greenBright(end)}`
      )
    })
    .catch((err) => {
      chalk.red(err)
    })
})()
