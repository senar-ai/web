import { Outlet } from '@remix-run/react'
import * as React from 'react'
import { PageLayout } from '../components/page-layout'

export default function Activities() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}
