import * as React from 'react'
import { ContactsGrid } from '../components/contacts-grid'
import { PageLayout } from '../components/page-layout'
import { contacts } from '../model/contacts'

export default function AboutUs() {
  return (
    <PageLayout>
      {/* Replace with your content */}
      <ContactsGrid contacts={contacts} />
      {/* /End replace */}
    </PageLayout>
  )
}
