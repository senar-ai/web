import * as React from 'react'
import { ActionCards } from '../components/action-cards'
import { PageLayout } from '../components/page-layout'
import { categories } from '../model/categories'

export default function Index() {
  const [keyword, setKeyword] = React.useState('')
  const filteredCategories = categories.filter((category) => {
    if (keyword) {
      return (
        category.title.toLowerCase().includes(keyword.toLowerCase()) ||
        category.description.toLowerCase().includes(keyword.toLowerCase())
      )
    } else {
      return true
    }
  })
  return (
    <PageLayout keyword={keyword} setKeyword={setKeyword}>
      <ActionCards categories={filteredCategories} />
    </PageLayout>
  )
}
