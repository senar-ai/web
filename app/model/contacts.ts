export type Contacts = Contact[]

export type Contact = {
  readonly name: string
  readonly role: string
  readonly description: string
  readonly platform: string
  readonly link: string
  readonly image: string
  readonly foregroundColor: string
  readonly backgroundColor: string
}

export const contacts: Contacts = [
  {
    name: 'Ainun Najib',
    role: 'Data & Tech',
    description: 'Arek NU asli Gresik',
    platform: 'Twitter',
    link: 'https://twitter.com/ainunnajib',
    image: '/images/ainun.jpg',
    foregroundColor: 'text-green-700',
    backgroundColor: 'bg-green-50',
  },
  {
    name: 'Adhi Utama',
    role: 'Data Analytics',
    description: 'We want our children to be able to take challenges, to take risk, to be able to climb',
    platform: 'LinkedIn',
    link: 'https://www.linkedin.com/in/adhi-utama/',
    image: '/images/adhi.jpg',
    foregroundColor: 'text-sky-700',
    backgroundColor: 'bg-sky-50',
  },
  {
    name: 'Zain Fathoni',
    role: 'Frontend Developer',
    description: 'An Indonesian Developer Living in Singapore',
    platform: 'Website',
    link: 'https://zainfathoni.com/about',
    image: '/images/zain.jpg',
    foregroundColor: 'text-rose-700',
    backgroundColor: 'bg-rose-50',
  },
]
