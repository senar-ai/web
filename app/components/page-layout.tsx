import * as React from 'react'
import { TopNavigation } from './top-navigation'

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-full">
      <TopNavigation />

      <main className="-mt-24">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
