import { useMatches } from '@remix-run/react'
import * as React from 'react'
import { Grid2Plus } from '../icons/duotone'
import type { Activity } from '../model/activities'
import { getCategoryByCategorySlug } from '../model/categories'
import { classNames } from '../utils/class-names'
import { Card } from './card'
import { senaraiForm } from './top-navigation'

export function ActivitesGrid({ activities }: { activities: Activity[] }) {
  const matches = useMatches()
  const categorySlug = matches[matches.length - 1].params?.categorySlug
  const category = getCategoryByCategorySlug(categorySlug)
  const addNewActivityLink = `${senaraiForm}?usp=pp_url&entry.1040472985=${encodeURIComponent(category.title)}`
  if (activities.length) {
    return (
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {activities.map(({ id, nama, link, ringkasan, image, usia, categorySlug }) => {
          const { icon, iconForeground, iconBackground, title } = getCategoryByCategorySlug(categorySlug)
          return (
            <Card
              key={id}
              name={nama}
              cta="Kunjungi"
              link={link}
              secondaryCta="Koreksi"
              secondaryLink={`${senaraiForm}?usp=pp_url&entry.1040472985=${encodeURIComponent(
                usia
              )}&entry.105812429=${encodeURIComponent(nama)}&entry.1084985767=${encodeURIComponent(
                ringkasan
              )}&entry.1503344235=${encodeURIComponent(link)}`}
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
        <Card
          name="Tambah Aktivitas Baru"
          description={`Usulkan aktivitas baru untuk kategori ${category.title}`}
          cta="Usulkan"
          category={category.title}
          link={addNewActivityLink}
          icon={Grid2Plus}
          foregroundColor={category.iconForeground}
          backgroundColor={category.iconBackground}
        />
      </ul>
    )
  } else {
    return (
      <div className="text-center bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <div
          className={classNames(
            category.iconBackground,
            category.iconForeground,
            'rounded-xl inline-flex p-4 mb-4 ring-4 ring-white'
          )}
        >
          <category.icon className="w-16 h-16 flex-shrink-0 mx-auto " />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada aktivitas {category.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          Ada usulan? Silakan tambahkan aktivitas untuk {category.description} melalui formulir berikut ini.
        </p>
        <div className="mt-6">
          <a
            href={addNewActivityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Grid2Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Usulkan Aktivitas
          </a>
        </div>
      </div>
    )
  }
}
