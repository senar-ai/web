import * as React from 'react'
import activities from '../model/activities'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Senarai belajar skill abad 21 untuk anak-anak</h1>
      <ul>
        {activities.map(({ nama, link }) => (
          <li key={nama}>
            {link ? (
              <a target="_blank" rel="noreferrer noopener" href={link}>
                {nama}
              </a>
            ) : (
              <div>{nama} </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
