import { Link, useMatches } from '@remix-run/react'
import * as React from 'react'
import { categoriesRecord } from '../model/categories'
import { Duotone } from './icons'

export default function Breadcrumbs() {
  const matches = useMatches()
  const filteredMatches = matches.filter(
    (match) => match.pathname !== '/' || !match.pathname.endsWith('/')
  )
  if (filteredMatches.length && filteredMatches[0].pathname === '/activities') {
    return (
      <nav className="flex" aria-label="Breadcrumbs">
        <ol className="bg-white rounded-md shadow px-6 flex space-x-4 min-w-full">
          <li className="flex">
            <div className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                <Duotone
                  id="house"
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Aktivitas</span>
              </Link>
            </div>
          </li>
          {filteredMatches.map(
            ({
              pathname,
              handle,
              params,
            }: {
              pathname: string
              handle?: string
              params: Record<string, string>
            }) => (
              <li key={pathname} className="flex">
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-6 h-full text-gray-200"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                  <Link
                    to={pathname}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={'page'}
                  >
                    {handle ??
                      categoriesRecord[params.categorySlug]?.title ??
                      'Semua Aktivitas'}
                  </Link>
                </div>
              </li>
            )
          )}
        </ol>
      </nav>
    )
  } else {
    return null
  }
}
