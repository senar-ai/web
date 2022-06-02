import * as React from 'react'
import activities from '../model/activities'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Senarai belajar skill abad 21 untuk anak-anak</h1>
      <ul>
        {activities.map(({ nama, link, ringkasan }) => (
          <li key={nama}>
            <details open={link}>
              <summary>{nama}</summary>
              {link ? (
                <a target="_blank" rel="noreferrer noopener" href={link} className="underline">
                  {ringkasan}
                </a>
              ) : (
                <div>{ringkasan}</div>
              )}
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}
