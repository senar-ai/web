import * as React from 'react'
import { Disclosure } from '@headlessui/react'
import { Link, useMatches } from '@remix-run/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBars, faMagnifyingGlass, faX } from '@fortawesome/pro-duotone-svg-icons'
import { classNames } from '../utils/class-names'
import Breadcrumbs from './breadcrumbs'

export const senaraiForm =
  'https://docs.google.com/forms/d/e/1FAIpQLSe3mkw1HYUkRklU_sRTk5qgdr_jItqxR7wAjP_W0uEU8HBRqA/viewform'

const navigation = [
  { name: 'Senarai', href: '/' },
  { name: 'Aktivitas', href: '/activities' },
  { name: 'Tentang Kami', href: '/tentang-kami' },
  { name: 'Kontribusi', href: senaraiForm, external: true },
  { name: 'Database Mentah', href: 'https://zainf.dev/senarai-db', external: true },
]

export type TopNavigationProps = {
  keyword: string
  setKeyword: (keyword: string) => void
}

export const TopNavigation: React.FC<TopNavigationProps> = (props: TopNavigationProps) => {
  const matches = useMatches()
  const currentPathname = matches[1]?.pathname
  const title = navigation.find(({ href }) => href === currentPathname)?.name

  return (
    <div className="bg-indigo-600 pb-32">
      <Disclosure
        as="nav"
        className="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none fixed w-screen z-10"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                <div className="px-2 flex items-center lg:px-0">
                  <Link to="/" className="flex-shrink-0 hover:opacity-75">
                    <img
                      className="block h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                      alt="Senarai"
                    />
                  </Link>
                  <div className="hidden lg:block lg:ml-10">
                    <div className="flex space-x-4">
                      {navigation.map((item) =>
                        item.external ? (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                              'rounded-md py-2 px-3 text-sm font-medium'
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.name}
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                              className="ml-2 h-4 w-4 inline"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            key={item.name}
                            className={classNames(
                              item.href === currentPathname
                                ? 'bg-indigo-700 text-white'
                                : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                              'rounded-md py-2 px-3 text-sm font-medium'
                            )}
                            aria-current={item.href === currentPathname ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Cari
                    </label>
                    <div className="relative text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                        placeholder="Cari"
                        type="search"
                        name="search"
                        value={props.keyword}
                        onChange={(e) => props.setKeyword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <FontAwesomeIcon icon={faX} className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={item.external ? 'a' : Link}
                    href={item.external ? item.href : undefined}
                    to={item.external ? undefined : item.href}
                    className={classNames(
                      item.href === currentPathname
                        ? 'bg-indigo-700 text-white'
                        : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                    aria-current={item.href === currentPathname ? 'page' : undefined}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.name}
                    {item.external ? (
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="ml-2 h-4 w-4 inline"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="translate-y-11 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <div className="mt-4 sm:-mt-1 sm:ml-6">
            <Breadcrumbs />
          </div>
        </div>
      </header>
    </div>
  )
}
