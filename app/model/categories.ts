import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faChildReaching,
  faSchool,
  faSchoolFlag,
  faBuildingColumns,
  faGraduationCap,
  faBriefcase,
  faFamily,
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

const categories: Categories = [
  {
    title: 'PAUD',
    slug: 'paud',
    description: 'Pendidikan Anak Usia Dini',
    icon: faChildReaching,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'PAUD ke atas',
    slug: 'paud-ke-atas',
    description: 'Usia tiga tahun ke atas',
    icon: falChildReaching,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'SD',
    slug: 'sd',
    description: 'Sekolah Dasar',
    icon: faSchool,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SD ke atas',
    slug: 'sd-ke-atas',
    description: 'Usia enam tahun ke atas',
    icon: falSchool,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SMP',
    slug: 'smp',
    description: 'Sekolah Menengah Pertama',
    icon: faSchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMP ke atas',
    slug: 'smp-ke-atas',
    description: 'Usia 12 tahun ke atas',
    icon: falSchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMA',
    slug: 'sma',
    description: 'Sekolah Menengah Atas',
    icon: faBuildingColumns,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'SMA ke atas',
    slug: 'sma-ke-atas',
    description: 'Usia 15 tahun ke atas',
    icon: falBuildingColumns,
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
    icon: faFamily,
    iconForeground: 'text-lime-700',
    iconBackground: 'bg-lime-50',
  },
]

export default categories
