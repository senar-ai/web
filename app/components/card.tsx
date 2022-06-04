/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faPenToSquare } from '@fortawesome/pro-duotone-svg-icons'
import { classNames } from '../utils/class-names'
import { Link } from '@remix-run/react'

export type CardProps = {
  name: string
  description: string
  cta: string
  link: string
  secondaryCta?: string
  secondaryLink?: string
  category: string
  categorySlug?: string
  image?: string
  icon?: IconDefinition
  foregroundColor?: string
  backgroundColor?: string
}

export const Card: React.FC<CardProps> = ({
  name,
  description,
  cta,
  link,
  secondaryCta,
  secondaryLink,
  image,
  category,
  categorySlug,
  icon,
  foregroundColor: iconForeground,
  backgroundColor: iconBackground,
}) => {
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        {image ? (
          <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={image} alt="" />
        ) : (
          <FontAwesomeIcon icon={icon} className={classNames(iconForeground, 'w-16 h-16 flex-shrink-0 mx-auto ')} />
        )}
        <h3 className="mt-6 text-gray-900 text-sm font-medium">{name}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Description</dt>
          <dd className="text-gray-500 text-sm">{description}</dd>
          <dt className="sr-only">Category</dt>
          <dd className="mt-3">
            {categorySlug ? (
              <Link
                to={`/activities/${categorySlug}`}
                className={classNames(
                  iconForeground,
                  iconBackground,
                  'px-4 py-2 text-sm font-medium rounded-full hover:text-opacity-75'
                )}
              >
                {category}
              </Link>
            ) : (
              <button
                className={classNames(
                  iconForeground,
                  iconBackground,
                  'px-4 py-2 text-sm font-medium rounded-full hover:text-opacity-75 cursor-not-allowed'
                )}
              >
                {category}
              </button>
            )}
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          {secondaryLink && secondaryCta ? (
            <div className="w-0 flex-1 flex">
              <a
                href="#"
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">{secondaryCta}</span>
              </a>
            </div>
          ) : null}
          <div className="-ml-px w-0 flex-1 flex">
            {link && cta ? (
              <a
                href={link.startsWith('http') ? link : `http://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <span className="mr-3">{cta}</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </a>
            ) : (
              <button
                disabled
                className="cursor-not-allowed relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <span>Belum ada pranala</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
