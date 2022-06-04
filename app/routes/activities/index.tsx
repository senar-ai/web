import type { MetaFunction } from '@remix-run/deno'
import { useOutletContext } from '@remix-run/react'
import * as React from 'react'
import { ActivitesGrid } from '../../components/activities-grid'
import { ActivitiesContextType } from '../activities'

export const meta: MetaFunction = () => ({
  title: 'Senarai | Semua Aktivitas',
})

export default function ActivitiesIndex() {
  const { activities } = useOutletContext<ActivitiesContextType>()
  return <ActivitesGrid activities={activities} />
}
