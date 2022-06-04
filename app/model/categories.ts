import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faChildReaching,
  faSchool,
  faSchoolFlag,
  faBuildingColumns,
  faGraduationCap,
  faBriefcase,
  faFamily,
  faPeopleGroup,
  faPersonChalkboard,
} from '@fortawesome/pro-duotone-svg-icons'
import {
  faChildReaching as falChildReaching,
  faSchool as falSchool,
  faSchoolFlag as falSchoolFlag,
  faBuildingColumns as falBuildingColumns,
} from '@fortawesome/pro-light-svg-icons'

export type Categories = Category[]

export type Category = {
  title: string
  slug: string
  description: string
  icon: IconDefinition
  iconForeground: string
  iconBackground: string
}

export const categories: Categories = [
  {
    title: 'PAUD',
    slug: 'paud',
    icon: falChildReaching,
    description: 'Pendidikan Anak Usia Dini',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'PAUD ke atas',
    slug: 'paud-ke-atas',
    description: 'Usia tiga tahun ke atas',
    icon: faChildReaching,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'SD',
    slug: 'sd',
    description: 'Sekolah Dasar',
    icon: falSchool,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SD ke atas',
    slug: 'sd-ke-atas',
    description: 'Usia enam tahun ke atas',
    icon: faSchool,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SMP',
    slug: 'smp',
    description: 'Sekolah Menengah Pertama',
    icon: falSchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMP ke atas',
    slug: 'smp-ke-atas',
    description: 'Usia 12 tahun ke atas',
    icon: faSchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMA',
    slug: 'sma',
    description: 'Sekolah Menengah Atas',
    icon: falBuildingColumns,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'SMA ke atas',
    slug: 'sma-ke-atas',
    description: 'Usia 15 tahun ke atas',
    icon: faBuildingColumns,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Kuliah',
    slug: 'kuliah',
    description: 'Perguruan Tinggi',
    icon: faGraduationCap,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Profesional',
    slug: 'profesional',
    description: 'Pekerja Profesional',
    icon: faBriefcase,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Semua Usia',
    slug: 'semua-usia',
    description: 'Untuk semua kalangan',
    icon: faPeopleGroup,
    iconForeground: 'text-lime-700',
    iconBackground: 'bg-lime-50',
  },
  {
    title: 'For Parents',
    slug: 'for-parents',
    description: 'Untuk dipelajari oleh orang tua',
    icon: faFamily,
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
  icon: faPersonChalkboard,
  iconForeground: 'text-amber-700',
  iconBackground: 'bg-amber-50',
}

export const getCategoryByCategorySlug = (categorySlug: string): Category => {
  return categoriesRecord[categorySlug] ?? uncategorized
}
