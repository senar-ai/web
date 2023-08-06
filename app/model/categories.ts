export type Categories = Category[]

export type Category = {
  title: string
  slug: string
  description: string
  iconSet: 'duotone' | 'light'
  iconId: string
  iconForeground: string
  iconBackground: string
}

export const categories: Categories = [
  {
    title: 'PAUD',
    slug: 'paud',
    iconSet: 'light',
    iconId: 'child-reaching',
    description: 'Pendidikan Anak Usia Dini',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'PAUD ke atas',
    slug: 'paud-ke-atas',
    description: 'Usia tiga tahun ke atas',
    iconSet: 'duotone',
    iconId: 'child-reaching',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'SD',
    slug: 'sd',
    description: 'Sekolah Dasar',
    iconSet: 'light',
    iconId: 'school',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SD ke atas',
    slug: 'sd-ke-atas',
    description: 'Usia enam tahun ke atas',
    iconSet: 'duotone',
    iconId: 'school',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SMP',
    slug: 'smp',
    description: 'Sekolah Menengah Pertama',
    iconSet: 'light',
    iconId: 'school-flag',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMP ke atas',
    slug: 'smp-ke-atas',
    description: 'Usia 12 tahun ke atas',
    iconSet: 'duotone',
    iconId: 'school-flag',
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMA',
    slug: 'sma',
    description: 'Sekolah Menengah Atas',
    iconSet: 'light',
    iconId: 'building-columns',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'SMA ke atas',
    slug: 'sma-ke-atas',
    description: 'Usia 15 tahun ke atas',
    iconSet: 'duotone',
    iconId: 'building-columns',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Kuliah',
    slug: 'kuliah',
    description: 'Perguruan Tinggi',
    iconSet: 'duotone',
    iconId: 'graduation-cap',
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Profesional',
    slug: 'profesional',
    description: 'Pekerja Profesional',
    iconSet: 'duotone',
    iconId: 'briefcase',
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Semua Usia',
    slug: 'semua-usia',
    description: 'Untuk semua kalangan',
    iconSet: 'duotone',
    iconId: 'people-group',
    iconForeground: 'text-lime-700',
    iconBackground: 'bg-lime-50',
  },
  {
    title: 'For Parents',
    slug: 'for-parents',
    description: 'Untuk dipelajari oleh orang tua',
    iconSet: 'duotone',
    iconId: 'family',
    iconForeground: 'text-emerald-700',
    iconBackground: 'bg-emerald-50',
  },
]

export const categoriesRecord = categories.reduce((acc, category) => {
  acc[category.slug] = category
  return acc
}, {} as Record<string, Category>)

const uncategorized: Category = {
  title: 'Belum Terkategorikan',
  slug: 'belum-terkategorikan',
  description: 'Belum teridentifikasi untuk kategori usia tertentu',
  iconSet: 'duotone',
  iconId: 'person-chalkboard',
  iconForeground: 'text-amber-700',
  iconBackground: 'bg-amber-50',
}

export const getCategoryByCategorySlug = (categorySlug: string): Category => {
  return categoriesRecord[categorySlug] ?? uncategorized
}
