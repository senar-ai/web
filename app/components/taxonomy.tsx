import * as React from 'react'
import { Activity } from '../model/activities'
import { isAllEmptyString } from '../utils/string'
import { ChevronRight } from '../icons/solid'

export function Taxonomy({
  activity: { benua, negara, provinsi, kabupaten, kecamatan, desa },
}: {
  activity: Activity
}) {
  const taxonomy = [benua, negara, provinsi, kabupaten, kecamatan, desa]
  const reducedTaxonomy = taxonomy.reduce((acc, curr) => (acc[acc.length - 1] === curr ? acc : [...acc, curr]), [])
  const [first, ...rest] = reducedTaxonomy
  if (isAllEmptyString(taxonomy)) return null
  else
    return (
      <nav className="flex py-2" aria-label="Taxonomy">
        <ol className="flex items-center space-x-1">
          <li>
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-500 hover:text-gray-700">{first}</div>
            </div>
          </li>
          {rest.map((item) => (
            <li key={item}>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 h-3 w-3 text-gray-400" aria-hidden="true" />
                <div className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700">{item}</div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    )
}
