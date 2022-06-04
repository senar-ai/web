import * as React from 'react'
import activities from '../../model/activities'
import { isAllEmptyString } from '../../utils/string'
import { TopNavigation } from '../../components/top-navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons'

export default function Index() {
  return (
    <div className="min-h-full">
      <TopNavigation />

      <main className="-mt-24">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <ul role="list" className="divide-y divide-gray-200">
              {activities.map(
                ({ id, nama, link, ringkasan, benua, negara, provinsi, kabupaten, kecamatan, desa, usia }) => {
                  const taxonomy = [benua, negara, provinsi, kabupaten, kecamatan, desa]
                  const reducedTaxonomy = taxonomy.reduce(
                    (acc, curr) => (acc[acc.length - 1] === curr ? acc : [...acc, curr]),
                    []
                  )
                  const [first, ...rest] = reducedTaxonomy
                  return (
                    <li
                      key={id}
                      className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    >
                      <div className="flex justify-between space-x-3">
                        <div className="min-w-0 flex-1">
                          <a target="_blank" rel="noreferrer noopener" href={link} className="block focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {nama}
                              <span className="flex-shrink-0 inline-block ml-2 px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                {usia}
                              </span>
                            </p>
                            {isAllEmptyString(taxonomy) ? null : (
                              <nav className="flex py-2" aria-label="Taxonomy">
                                <ol role="list" className="flex items-center space-x-1">
                                  <li>
                                    <div className="flex items-center">
                                      <div className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                        {first}
                                      </div>
                                    </div>
                                  </li>
                                  {rest.map((item) => (
                                    <li key={item}>
                                      <div className="flex items-center">
                                        <FontAwesomeIcon
                                          icon={faAngleRight}
                                          className="flex-shrink-0 h-3 w-3 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <div className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                                          {item}
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ol>
                              </nav>
                            )}
                          </a>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-600">{ringkasan}</p>
                      </div>
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
