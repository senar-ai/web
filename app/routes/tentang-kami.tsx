import * as React from 'react'
import { ContactsGrid } from '../components/contacts-grid'
import { PageLayout } from '../components/page-layout'
import { contacts } from '../model/contacts'

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
