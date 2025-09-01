import * as React from 'react'
import { TopNavigation, TopNavigationProps } from './top-navigation'

export const PageLayout: React.FC<
  { children: React.ReactNode } & TopNavigationProps
> = (props) => {
  return (
    <div className="min-h-screen">
      <TopNavigation keyword={props.keyword} setKeyword={props.setKeyword} />

      <main className="-mt-24">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
          {props.children}
        </div>
      </main>
    </div>
  )
}
