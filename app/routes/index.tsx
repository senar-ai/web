import * as React from 'react'
import { ActionCards } from '../components/action-cards'
import { TopNavigation } from '../components/top-navigation'
import { categories } from '../model/categories'

export default function Example() {
  return (
    <div className="min-h-full">
      <TopNavigation />

      <main className="-mt-24">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <ActionCards categories={categories} />
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}
