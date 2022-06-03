import * as React from 'react'
import { TopNavigation } from '../components/top-navigation'

export default function Example() {
  return (
    <div className="min-h-full">
      <TopNavigation />

      <main className="-mt-24">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}
