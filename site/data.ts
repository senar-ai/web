import { readFileSync } from 'node:fs'
import { categories, getCategoryByCategorySlug } from '../app/model/categories.ts'
import type { Activities, Activity } from '../app/model/activities.ts'
import type { Contacts } from '../app/model/contacts.ts'
import { contacts } from '../app/model/contacts.ts'

export type { Activity, Activities, Contacts }

export const SITE_ORIGIN = 'https://senar.ai'

export const shortlinks = {
  draft:
    'https://docs.google.com/spreadsheets/d/1-nl7RHGsQwF12GzGfj22YJiqlwLjm1ix-hqcR1mJxWs/edit#gid=0',
  responses:
    'https://docs.google.com/spreadsheets/d/194RDJZ5aSe87GdsjEEJPcrINB18w40fkPNtGtKRDgWM/edit?resourcekey#gid=742951977',
  form: 'https://docs.google.com/forms/d/e/1FAIpQLSe3mkw1HYUkRklU_sRTk5qgdr_jItqxR7wAjP_W0uEU8HBRqA/viewform',
  db: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQUXjZ5M1lL9thjOEeNJxKsvE3VQ8i3XXUt8ryKWiya1HdapIcLuMUHKZ-VWECqCcX-cPKCZYzPXVvY/pubhtml',
  github: 'https://github.com/senar-ai/web',
} as const

export type ShortlinkName = keyof typeof shortlinks

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1-nl7RHGsQwF12GzGfj22YJiqlwLjm1ix-hqcR1mJxWs/export?format=csv&gid=0'

export function sheetUrl(): string {
  return SHEET_URL
}

export function loadActivities(jsonPath: string): Activities {
  const database = JSON.parse(readFileSync(jsonPath, 'utf8')) as Array<{
    data: Activities
  }>
  const activities = database[0]?.data
  if (!Array.isArray(activities) || activities.length === 0) {
    throw new Error(`No activities in ${jsonPath}`)
  }
  const named = activities.filter((activity) => activity.nama)
  if (named.length === 0) {
    throw new Error(`No named activities in ${jsonPath}`)
  }
  return named
}

export function loadLastUpdated(jsonPath: string): string {
  const timestamp = JSON.parse(readFileSync(jsonPath, 'utf8')) as {
    lastUpdated?: string
  }
  if (!timestamp.lastUpdated) {
    throw new Error(`No lastUpdated in ${jsonPath}`)
  }
  return timestamp.lastUpdated
}

export function activitiesInCategory(
  activities: Activities,
  categorySlug: string,
): Activities {
  return activities.filter((activity) => activity.categorySlug === categorySlug)
}

export { categories, contacts, getCategoryByCategorySlug }
