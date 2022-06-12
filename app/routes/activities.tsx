import { Outlet, useMatches } from '@remix-run/react'
import * as React from 'react'
import { PageLayout } from '../components/page-layout'
import { activities, Activities } from '../model/activities'

export const handle = 'Aktivitas'

export type ActivitiesContextType = {
  activities: Activities
}

export default function Activities() {
  const matches = useMatches()
  const categorySlug = matches[2]?.params?.categorySlug

  const [keyword, setKeyword] = React.useState('')
  const filteredActivities = activities.filter((activity) => {
    const isInCategory = categorySlug
      ? activity.categorySlug === categorySlug
      : true
    if (keyword) {
      return (
        activity.nama.toLowerCase().includes(keyword.toLowerCase()) ||
        activity.usia.toLowerCase().includes(keyword.toLowerCase()) ||
        activity.ringkasan.toLowerCase().includes(keyword.toLowerCase())
      )
    } else {
      return isInCategory
    }
  })
  const context: ActivitiesContextType = { activities: filteredActivities }
  return (
    <PageLayout keyword={keyword} setKeyword={setKeyword}>
      <Outlet context={context} />
    </PageLayout>
  )
}
