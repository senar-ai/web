/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faPenToSquare, faPersonChalkboard } from '@fortawesome/pro-duotone-svg-icons'
import type { Activity } from '../model/activities'

export function CardsList({ activities }: { activities: Activity[] }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {activities.map(({ id, nama, link, ringkasan, image, usia }) => (
        <li
          key={id}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            {image ? (
              <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={image} alt="" />
            ) : (
              <FontAwesomeIcon
                icon={faPersonChalkboard}
                className="w-32 h-32 flex-shrink-0 mx-auto rounded-full text-sky-600"
              />
            )}
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{nama}</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-500 text-sm">{ringkasan}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                {/* TODO: style usia similar to the home page icons & colors */}
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{usia}</span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <a
                  // TODO: prefill form with the current data
                  href="#"
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Koreksi</span>
                </a>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <a
                  href={link.startsWith('http') ? link : `http://${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <span className="mr-3">Kunjungi</span>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
