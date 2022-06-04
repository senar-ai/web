import { Outlet } from '@remix-run/react'
import * as React from 'react'
import { PageLayout } from '../components/page-layout'
import { activities, Activities } from '../model/activities'

export type ActivitiesContextType = {
  activities: Activities
}

export default function Activities() {
  const [keyword, setKeyword] = React.useState('')
  const filteredActivities = activities.filter((activity) => {
    if (keyword) {
      return (
        activity.nama.toLowerCase().includes(keyword.toLowerCase()) ||
        activity.usia.toLowerCase().includes(keyword.toLowerCase()) ||
        activity.ringkasan.toLowerCase().includes(keyword.toLowerCase())
      )
    } else {
      return true
    }
  })
  const context: ActivitiesContextType = { activities: filteredActivities }
  return (
    <PageLayout keyword={keyword} setKeyword={setKeyword}>
      <Outlet context={context} />
    </PageLayout>
  )
}
