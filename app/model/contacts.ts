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
    image: 'https://pbs.twimg.com/profile_images/1372379918428897287/r1tnrc9e_400x400.jpg',
    foregroundColor: 'text-green-700',
    backgroundColor: 'bg-green-50',
  },
  {
    name: 'Adhi Utama',
    role: 'Data Analytics',
    description: 'We want our children to be able to take challenges, to take risk, to be able to climb',
    platform: 'LinkedIn',
    link: 'https://www.linkedin.com/in/adhi-utama/',
    image:
      'https://media-exp1.licdn.com/dms/image/C5603AQHYQtSF_xiseA/profile-displayphoto-shrink_400_400/0/1616390935999?e=1659571200&v=beta&t=IdZgx7OHTF9sQgDEmOgRFSnYOMpOAA4UvYb0I5yYqlc',
    foregroundColor: 'text-sky-700',
    backgroundColor: 'bg-sky-50',
  },
  {
    name: 'Zain Fathoni',
    role: 'Frontend Developer',
    description: 'An Indonesian Developer Living in Singapore',
    platform: 'Website',
    link: 'https://zainfathoni.com/about',
    image: 'https://avatars.githubusercontent.com/u/6315466?v=4',
    foregroundColor: 'text-rose-700',
    backgroundColor: 'bg-rose-50',
  },
]
