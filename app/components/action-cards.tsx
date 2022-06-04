import * as React from 'react'
import { classNames } from '../utils/class-names'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import { Link } from '@remix-run/react'

const actions = [
  {
    title: 'PAUD',
    description: 'Pendidikan Anak Usia Dini',
    href: '#',
    icon: faChildReaching,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'PAUD ke atas',
    description: 'Usia tiga tahun ke atas',
    href: '#',
    icon: fatChildReaching,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'SD',
    description: 'Sekolah Dasar',
    href: '#',
    icon: faSchool,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SD ke atas',
    description: 'Usia enam tahun ke atas',
    href: '#',
    icon: fatSchool,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'SMP',
    description: 'Sekolah Menengah Pertama',
    href: '#',
    icon: faSchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMP ke atas',
    description: 'Usia 12 tahun ke atas',
    href: '#',
    icon: fatSchoolFlag,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'SMA',
    description: 'Sekolah Menengah Atas',
    href: '#',
    icon: faBuildingColumns,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'SMA ke atas',
    description: 'Usia 15 tahun ke atas',
    href: '#',
    icon: fatBuildingColumns,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Kuliah',
    description: 'Perguruan Tinggi',
    href: '#',
    icon: faGraduationCap,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  {
    title: 'Profesional',
    description: 'Pekerja Profesional',
    href: '#',
    icon: faBriefcase,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Semua Usia',
    description: 'Untuk semua kalangan',
    href: '#',
    icon: faFamily,
    iconForeground: 'text-lime-700',
    iconBackground: 'bg-lime-50',
  },
]

export function ActionCards() {
  return (
    <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                'rounded-lg inline-flex p-3 ring-4 ring-white'
              )}
            >
              <FontAwesomeIcon icon={action.icon} className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium">
              <Link to="/activities" className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {action.description ??
                'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'}
            </p>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}
