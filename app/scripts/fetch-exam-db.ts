import chalk from 'chalk'
import { load } from 'cheerio'
import fetch from 'cross-fetch'
import fs from 'fs'
import ora from 'ora'
import path from 'path'
import { rowReducer } from '../utils/google-sheets'
import { getKebabCase, isAllEmptyString, toSecond } from '../utils/string'

export async function fetchDatabase() {
  const source = await fetch('https://zainf.dev/exam-evaluation-db')
  const $ = load(await source.text())

  const colMap: Record<string, string> = {}

  const sheetList = $('#sheet-menu > li')
    .map((_, li) => {
      const sheetId = ($(li).attr('id') as string).replace('sheet-button-', '')
      const sheetName = $(li).text()
      const sheetColumns = $(`#${sheetId} tbody > tr:nth-child(1)`)
        .find('td')
        .map((colIndex, td) => {
          colMap[colIndex] = $(td).text()
          return {
            name: $(td).text(),
            index: colIndex,
          }
        })
        .toArray()
        .filter((col) => col.name.trim().length !== 0)
      const sheetRows = $(`#${sheetId} tbody > tr`)
        .map((rowIndex, tr) => {
          if (rowIndex === 0) {
            return []
          }
          return [
            $(tr)
              .find('td')
              .map((colIndex, td) => {
                if (colMap[colIndex]) {
                  // Kebutuhan, Keterangan, Lokasi, & Penyedia aren't supposed to be linked
                  if (colIndex < 5) {
                    return $(td).text().trim()
                  } else {
                    return ($(td).html() as string).trim()
                  }
                }
                return ''
              })
              .toArray(),
          ]
        })
        .toArray()
        .filter((row) => !isAllEmptyString(row))

      return {
        id: sheetId,
        name: sheetName,
        slug: getKebabCase(sheetName),
        data: sheetRows.map((row, rowIndex) => {
          return sheetColumns.reduce(rowReducer(row), {
            id: rowIndex.toString(),
          })
        }),
      }
    })
    .toArray()

  fs.writeFileSync(
    path.resolve(__dirname, '../data/exam-db.json'),
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
    `${chalk.yellowBright('Fetching Exam database...')}`
  ).start()
  fetchDatabase()
    .then(() => {
      const end = `${toSecond(process.hrtime(start))} seconds`
      spinner.succeed(
        `Fetching Exam database is done in ${chalk.greenBright(end)}`
      )
    })
    .catch((err) => {
      chalk.red(err)
    })
})()
