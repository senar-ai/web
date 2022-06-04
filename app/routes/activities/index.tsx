import * as React from 'react'
import { CardsList } from '../../components/cards-list'
import { TopNavigation } from '../../components/top-navigation'
import { activities } from '../../model/activities'

export default function Index() {
  return (
    <div className="min-h-full">
      <TopNavigation />

      <main className="-mt-24">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* TODO: filter activities */}
          <CardsList activities={activities} />
        </div>
      </main>
    </div>
  )
}
