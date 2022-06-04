import * as React from 'react'
import { ActivitesGrid } from '../../components/activities-grid'
import { activities } from '../../model/activities'

export default function Index() {
  return <ActivitesGrid activities={activities} />
}
