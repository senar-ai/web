import * as React from 'react'
import type { MetaFunction } from '@remix-run/deno'
import { ContactsGrid } from '../components/contacts-grid'
import { PageLayout } from '../components/page-layout'
import { contacts } from '../model/contacts'

export const handle = 'Tentang Kami'

export const meta: MetaFunction = () => {
  return {
    title: `Senarai | ${handle}`,
    description: `Sekilas tentang kurator Senarai`,
  }
}

export default function AboutUs() {
  const [keyword, setKeyword] = React.useState('')
  const filteredContacts = contacts.filter((contact) => {
    if (keyword) {
      return (
        contact.name.toLowerCase().includes(keyword.toLowerCase()) ||
        contact.role.toLowerCase().includes(keyword.toLowerCase()) ||
        contact.description.toLowerCase().includes(keyword.toLowerCase()) ||
        contact.platform.toLowerCase().includes(keyword.toLowerCase())
      )
    } else {
      return true
    }
  })
  return (
    <PageLayout keyword={keyword} setKeyword={setKeyword}>
      {/* Replace with your content */}
      <ContactsGrid contacts={filteredContacts} />
      {/* /End replace */}
    </PageLayout>
  )
}
