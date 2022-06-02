import * as React from 'react'
import activities from '../model/activities'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <div className="my-8 mx-4 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Senarai belajar skill abad 21 untuk anak-anak
          </h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe3mkw1HYUkRklU_sRTk5qgdr_jItqxR7wAjP_W0uEU8HBRqA/viewform"
            target="_blank"
            rel="noreferrer noopener"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Form Kontribusi
          </a>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {activities.map(({ id, nama, link, ringkasan }) => (
          <li
            key={id}
            className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
          >
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <a target="_blank" rel="noreferrer noopener" href={link} className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 truncate">{nama}</p>
                  <p className="text-sm text-gray-500 truncate">{nama}</p>
                </a>
              </div>
              {/* <time dateTime={message.datetime} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                {message.time}
              </time> */}
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-600">{ringkasan}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
