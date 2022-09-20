import { Activity } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/deno'
import { json } from '@remix-run/deno'
import { Outlet, useLoaderData } from '@remix-run/react'
import * as React from 'react'
import { PageLayout } from '../components/page-layout'
import { db } from '../utils/db.server'

export const handle = 'Kontribusi'

export type ContributionsContextType = {
  contributions: Activity[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const contributions = await db.activity.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return json(contributions, {
    headers: {
      'Cache-Control': 'public, max-age=60',
    },
  })
}

export default function Contributions() {
  const { contributions } = useLoaderData<ContributionsContextType>()

  const [keyword, setKeyword] = React.useState('')
  const filteredContributions = contributions.filter((activity) => {
    if (keyword) {
      return (
        activity.name.toLowerCase().includes(keyword.toLowerCase()) ||
        activity.description.toLowerCase().includes(keyword.toLowerCase()) ||
        activity.url.toLowerCase().includes(keyword.toLowerCase())
      )
    } else {
      return true
    }
  })
  const context: ContributionsContextType = {
    contributions: filteredContributions,
  }
  return (
    <PageLayout keyword={keyword} setKeyword={setKeyword}>
      <Outlet context={context} />
    </PageLayout>
  )
}
