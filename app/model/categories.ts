import {
  ChildReaching,
  School,
  SchoolFlag,
  BuildingColumns,
  GraduationCap,
  Briefcase,
  PeopleGroup,
  Family,
  PersonChalkboard,
} from '../icons/duotone'
import {
  ChildReaching as LChildReaching,
  School as LSchool,
  SchoolFlag as LSchoolFlag,
  BuildingColumns as LBuildingColumns,
} from '../icons/light'

export type Categories = Category[]

export type Category = {
  title: string
  slug: string
  description: string
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement
  iconForeground: string
  iconBackground: string
}

export const categories: Categories = [
  {
    title: 'PAUD',
    slug: 'paud',
    icon: LChildReaching,
    description: 'Pendidikan Anak Usia Dini',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'PAUD ke atas',
    slug: 'paud-ke-atas',
    description: 'Usia tiga tahun ke atas',
    icon: ChildReaching,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'SD',
    slug: 'sd',
    description: 'Sekolah Dasar',
    icon: LSchool,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SD ke atas',
    slug: 'sd-ke-atas',
    description: 'Usia enam tahun ke atas',
    icon: School,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SMP',
    slug: 'smp',
    description: 'Sekolah Menengah Pertama',
    icon: LSchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMP ke atas',
    slug: 'smp-ke-atas',
    description: 'Usia 12 tahun ke atas',
    icon: SchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMA',
    slug: 'sma',
    description: 'Sekolah Menengah Atas',
    icon: LBuildingColumns,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'SMA ke atas',
    slug: 'sma-ke-atas',
    description: 'Usia 15 tahun ke atas',
    icon: BuildingColumns,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Kuliah',
    slug: 'kuliah',
    description: 'Perguruan Tinggi',
    icon: GraduationCap,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Profesional',
    slug: 'profesional',
    description: 'Pekerja Profesional',
    icon: Briefcase,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Semua Usia',
    slug: 'semua-usia',
    description: 'Untuk semua kalangan',
    icon: PeopleGroup,
    iconForeground: 'text-lime-700',
    iconBackground: 'bg-lime-50',
  },
  {
    title: 'For Parents',
    slug: 'for-parents',
    description: 'Untuk dipelajari oleh orang tua',
    icon: Family,
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
  icon: PersonChalkboard,
  iconForeground: 'text-amber-700',
  iconBackground: 'bg-amber-50',
}

export const getCategoryByCategorySlug = (categorySlug: string): Category => {
  return categoriesRecord[categorySlug] ?? uncategorized
}
