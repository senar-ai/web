/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react'
import type { Activity } from '../model/activities'
import { getCategoryByCategorySlug } from '../model/categories'
import { Card } from './card'

export function ActivitesGrid({ activities }: { activities: Activity[] }) {
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
            secondaryLink="#" // TODO: compose a URL to the Google Form with prefilled data
            description={ringkasan}
            image={image}
            category={title}
            icon={icon}
            foregroundColor={iconForeground}
            backgroundColor={iconBackground}
          />
        )
      })}
    </ul>
  )
}
