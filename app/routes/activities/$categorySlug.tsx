import type { MetaFunction } from '@remix-run/deno'
import { useOutletContext } from '@remix-run/react'
import * as React from 'react'
import { ActivitesGrid } from '../../components/activities-grid'
import { getCategoryByCategorySlug } from '../../model/categories'
import { ActivitiesContextType } from '../activities'

export const meta: MetaFunction = ({ params: { categorySlug } }) => {
  const category = getCategoryByCategorySlug(categorySlug)
  return {
    title: `Senarai | Aktivitas ${category.title}`,
    description: `Daftar aktivitas ${category.description}`,
  }
}

export default function ActivitiesInCategory() {
  const { activities } = useOutletContext<ActivitiesContextType>()
  return <ActivitesGrid activities={activities} />
}
