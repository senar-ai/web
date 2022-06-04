import type { MetaFunction, LinksFunction } from '@remix-run/deno'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import * as React from 'react'

import styles from './tailwind.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

const title = 'Senarai'
const description = 'Senarai Belajar Skill Abad 21'
const image = 'https://senar.ai/images/preview.png'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title,
  description,
  viewport: 'width=device-width,initial-scale=1',
  'og:title': title,
  'og:description': description,
  'og:image:width': '1200',
  'og:image:height': '630',
  'og:image': image,
  'twitter:image': image,
  'twitter:card': 'summary_large_image',
  'twitter:creator': '@ainunnajib',
  'twitter:site': '@ainunnajib',
  'twitter:title': title,
  'twitter:description': description,
})

export default function App() {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
