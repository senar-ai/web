import assert from 'node:assert/strict'
import test from 'node:test'
import { shortlinkLocation } from './redirect.ts'

test('appends an incoming query onto a destination that has none', () => {
  const location = shortlinkLocation('github', new URLSearchParams('x=1'))
  const url = new URL(location)
  assert.equal(url.origin + url.pathname, 'https://github.com/senar-ai/web')
  assert.equal(url.searchParams.get('x'), '1')
  assert.equal(url.hash, '')
})

test('keeps a destination query and appends the incoming query', () => {
  const location = shortlinkLocation(
    'responses',
    new URLSearchParams('x=1&y=2'),
  )
  const url = new URL(location)
  assert.ok(url.searchParams.has('resourcekey'))
  assert.equal(url.hash, '#gid=742951977')
  assert.equal(url.searchParams.get('x'), '1')
  assert.equal(url.searchParams.get('y'), '2')
  assert.equal(location.includes('#gid=742951977?'), false)
})

test('keeps a destination fragment and does not put the query after it', () => {
  const location = shortlinkLocation('draft', new URLSearchParams('x=1'))
  const url = new URL(location)
  assert.equal(url.searchParams.get('x'), '1')
  assert.equal(url.hash, '#gid=0')
  assert.equal(location.includes('#gid=0?'), false)
})

test('form prefill stays a query on the form URL', () => {
  const incoming = new URLSearchParams(
    'usp=pp_url&entry.1040472985=PAUD&entry.105812429=Nama',
  )
  const url = new URL(shortlinkLocation('form', incoming))
  assert.equal(url.searchParams.get('usp'), 'pp_url')
  assert.equal(url.searchParams.get('entry.1040472985'), 'PAUD')
  assert.equal(url.searchParams.get('entry.105812429'), 'Nama')
  assert.match(url.pathname, /\/viewform$/)
})

test('unknown names and /go go to / with no query', () => {
  assert.equal(shortlinkLocation(undefined, new URLSearchParams('x=1')), '/')
  assert.equal(shortlinkLocation('nope', new URLSearchParams('x=1')), '/')
  assert.equal(shortlinkLocation('', new URLSearchParams()), '/')
})
