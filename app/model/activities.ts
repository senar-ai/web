import database from '../data/senarai-db.json'

export type Activities = Activity[]

export type Activity = {
  readonly id: number
  readonly usia: string
  readonly categorySlug: string
  readonly nama: string
  readonly slug: string
  readonly ringkasan: string
  readonly link: string
  readonly desa: string
  readonly kecamatan: string
  readonly kabupaten: string
  readonly provinsi: string
  readonly negara: string
  readonly benua: string
  readonly image?: string
}

export const activities = database[0].data as unknown as Activities
