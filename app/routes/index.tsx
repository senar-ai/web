import * as React from 'react'
import { ActionCards } from '../components/action-cards'
import { PageLayout } from '../components/page-layout'
import { categories } from '../model/categories'

export default function Example() {
  return (
    <PageLayout>
      <ActionCards categories={categories} />
    </PageLayout>
  )
}
