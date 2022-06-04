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
  faChildReaching as fatChildReaching,
  faSchool as fatSchool,
  faSchoolFlag as fatSchoolFlag,
  faBuildingColumns as fatBuildingColumns,
} from '@fortawesome/pro-thin-svg-icons'

export type Categories = Category[]

export type Category = {
  title: string
  slug: string
  description: string
  icon: IconDefinition
  color: string
}

const categories: Categories = [
  {
    title: 'PAUD',
    slug: 'paud',
    description: 'Pendidikan Anak Usia Dini',
    icon: faChildReaching,
    color: 'teal',
  },
  {
    title: 'PAUD ke atas',
    slug: 'paud-ke-atas',
    description: 'Usia tiga tahun ke atas',
    icon: fatChildReaching,
    color: 'teal',
  },
  {
    title: 'SD',
    slug: 'sd',
    description: 'Sekolah Dasar',
    icon: faSchool,
    color: 'purple',
  },
  {
    title: 'SD ke atas',
    slug: 'sd-ke-atas',
    description: 'Usia enam tahun ke atas',
    icon: fatSchool,
    color: 'purple',
  },
  {
    title: 'SMP',
    slug: 'smp',
    description: 'Sekolah Menengah Pertama',
    icon: faSchoolFlag,
    color: 'sky',
  },
  {
    title: 'SMP ke atas',
    slug: 'smp-ke-atas',
    description: 'Usia 12 tahun ke atas',
    icon: fatSchoolFlag,
    color: 'sky',
  },
  {
    title: 'SMA',
    slug: 'sma',
    description: 'Sekolah Menengah Atas',
    icon: faBuildingColumns,
    color: 'yellow',
  },
  {
    title: 'SMA ke atas',
    slug: 'sma-ke-atas',
    description: 'Usia 15 tahun ke atas',
    icon: fatBuildingColumns,
    color: 'yellow',
  },
  {
    title: 'Kuliah',
    slug: 'kuliah',
    description: 'Perguruan Tinggi',
    icon: faGraduationCap,
    color: 'indigo',
  },
  {
    title: 'Profesional',
    slug: 'profesional',
    description: 'Pekerja Profesional',
    icon: faBriefcase,
    color: 'rose',
  },
  {
    title: 'Semua Usia',
    slug: 'semua-usia',
    description: 'Untuk semua kalangan',
    icon: faFamily,
    color: 'lime',
  },
]

export default categories
