import { faGrid2Plus } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMatches } from '@remix-run/react'
import * as React from 'react'
import type { Activity } from '../model/activities'
import { getCategoryByCategorySlug } from '../model/categories'
import { Card } from './card'
import { senaraiForm } from './top-navigation'

export function ActivitesGrid({ activities }: { activities: Activity[] }) {
  const matches = useMatches()
  if (activities.length) {
    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {activities.map(({ id, nama, link, ringkasan, image, categorySlug }) => {
          const { icon, iconForeground, iconBackground, title } = getCategoryByCategorySlug(categorySlug)
          return (
            <Card
              key={id}
              name={nama}
              cta="Kunjungi"
              link={link}
              secondaryCta="Koreksi"
              // secondaryLink="#" TODO: compose a URL to the Google Form with prefilled data
              description={ringkasan}
              image={image}
              category={title}
              categorySlug={categorySlug}
              icon={icon}
              foregroundColor={iconForeground}
              backgroundColor={iconBackground}
            />
          )
        })}
      </ul>
    )
  } else {
    const categorySlug = matches[matches.length - 1].params?.categorySlug
    const category = getCategoryByCategorySlug(categorySlug)
    return (
      <div className="text-center bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada aktivitas {category.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          Ada usulan? Silakan tambahkan aktivitas untuk {category.description} melalui formulir berikut ini.
        </p>
        <div className="mt-6">
          <a
            href={senaraiForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon icon={faGrid2Plus} className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Usulkan Aktivitas
          </a>
        </div>
      </div>
    )
  }
}
