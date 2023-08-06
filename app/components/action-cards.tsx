import { Link } from '@remix-run/react'
import * as React from 'react'
import { Categories } from '../model/categories'
import { classNames } from '../utils/class-names'
import { Icon } from './icon'

export function ActionCards({ categories }: { categories: Categories }) {
  return (
    <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px">
      {categories.map((category, categoryIdx) => (
        <div
          key={category.title}
          className={classNames(
            categoryIdx === 0
              ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
              : '',
            categoryIdx === 1 ? 'sm:rounded-tr-lg' : '',
            categoryIdx === categories.length - 3 ? 'sm:rounded-bl-lg' : '',
            categoryIdx === categories.length - 1
              ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
              : '',
            'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
          )}
        >
          <div>
            <span
              className={classNames(
                category.iconBackground,
                category.iconForeground,
                'rounded-lg inline-flex p-3 ring-4 ring-white'
              )}
            >
              <Icon
                set={category.iconSet}
                id={category.iconId}
                className="h-6 w-6"
              />
            </span>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-medium">
              <Link
                to={`/activities/${category.slug}`}
                className="focus:outline-none"
              >
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {category.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {category.description ??
                'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'}
            </p>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}
