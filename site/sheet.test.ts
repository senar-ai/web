import assert from 'node:assert/strict'
import test from 'node:test'
import { activitiesFromCsv, parseCsv } from './sheet.ts'

const HEADER = 'Usia,Nama,Ringkasan,Link,Image'

test('quoted fields keep commas, newlines, and doubled quotes', () => {
  const csv =
    'a,b,c\r\n' +
    '"one, two","line 1\nline 2","say ""hi"""\r\n' +
    'x,,"y"'
  assert.deepEqual(parseCsv(csv), [
    ['a', 'b', 'c'],
    ['one, two', 'line 1\nline 2', 'say "hi"'],
    ['x', '', 'y'],
  ])
})

test('a quote that is not closed is an error', () => {
  assert.throws(() => parseCsv('a,b\n"open,x\n'), /not closed/)
})

test('a quote inside an unquoted field is an error', () => {
  assert.throws(() => parseCsv('a,b\nx"y,z\n'), /unquoted field/)
})

test('a multiline summary stays one activity', () => {
  const csv = `${HEADER}\nSD ke atas,LEGO,"Line one\nLine two, with comma",https://lego.com/?a=1&b=2,\nSMP,Next,Two,,\n`
  const activities = activitiesFromCsv(csv)
  assert.equal(activities.length, 2)
  assert.deepEqual(
    { ...activities[0] },
    {
      id: '0',
      usia: 'SD ke atas',
      categorySlug: 'sd-ke-atas',
      nama: 'LEGO',
      slug: 'lego',
      ringkasan: 'Line one\nLine two, with comma',
      link: 'https://lego.com/?a=1&b=2',
      image: '',
    },
  )
  assert.equal(activities[1].id, '1')
  assert.equal(activities[1].nama, 'Next')
})

test('an HTML page instead of CSV is rejected', () => {
  assert.throws(
    () => activitiesFromCsv('<!DOCTYPE html><html><body>Sign in</body></html>'),
    /no column: Usia, Nama, Ringkasan, Link/,
  )
})

test('a header with no named activity is rejected', () => {
  assert.throws(() => activitiesFromCsv(`${HEADER}\n`), /no named activity/)
  assert.throws(() => activitiesFromCsv(`${HEADER}\nSD,,x,,\n`), /no named activity/)
  assert.throws(() => activitiesFromCsv(''), /empty/)
})
