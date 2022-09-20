import type { MetaFunction } from '@remix-run/deno'
import { useOutletContext } from '@remix-run/react'
import * as React from 'react'
import { ContributionsContextType } from '../contributions'

export const meta: MetaFunction = () => ({
  title: 'Senarai | Semua Kontribusi',
})

export default function ContributionsIndex() {
  const { contributions } = useOutletContext<ContributionsContextType>()
  return (
    <ul>
      {contributions.map((contribution) => (
        <li key={contribution.id}>{contribution.name}</li>
      ))}
    </ul>
  )
}
