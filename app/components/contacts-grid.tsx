/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react'
import { Contacts } from '../model/contacts'
import { Card } from './card'

export function ContactsGrid({ contacts }: { contacts: Contacts }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {contacts.map(
        ({
          name,
          role,
          platform,
          link,
          description,
          image,
          foregroundColor,
          backgroundColor,
        }) => {
          return (
            <Card
              key={name}
              name={name}
              cta={platform}
              link={link}
              description={description}
              image={image}
              category={role}
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
            />
          )
        }
      )}
    </ul>
  )
}
