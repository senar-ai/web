import type { Activities, Activity } from './data.ts'
import {
  categories,
  contacts,
  getCategoryByCategorySlug,
  SITE_ORIGIN,
} from './data.ts'
import { classNames, document, escapeHtml, externalHref, icon } from './html.ts'

const FORM = '/go/form'

type NavItem = {
  name: string
  href: string
  priority?: boolean
  external?: boolean
}

const NAV: NavItem[] = [
  { name: 'Senarai', href: '/' },
  { name: 'Aktivitas', href: '/activities', priority: true },
  { name: 'Tentang Kami', href: '/tentang-kami' },
  { name: 'Kontribusi', href: FORM, priority: true, external: true },
  { name: 'Database Mentah', href: 'https://senar.ai/go/db', external: true },
]

function searchInput(id: string): string {
  return `<div class="w-full lg:max-w-xs">
<label for="${id}" class="sr-only">Cari</label>
<div class="relative text-gray-400 focus-within:text-gray-600">
<div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
${icon('duotone', 'magnifying-glass', 'h-5 w-5')}
</div>
<input id="${id}" class="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm" placeholder="Cari" type="search" name="search" data-search>
</div>
</div>`
}

function navLink(item: NavItem, currentPath: string, mobile: boolean): string {
  const current = item.href === currentPath
  const hidden = mobile
    ? item.priority
      ? 'hidden lg:inline'
      : ''
    : item.priority
      ? ''
      : 'hidden lg:inline'
  const state = current
    ? 'bg-indigo-700 text-white'
    : 'text-white hover:bg-indigo-500 hover:bg-opacity-75'
  const layout = mobile
    ? 'block rounded-md py-2 px-3 text-base font-medium'
    : 'rounded-md py-2 px-3 text-sm font-medium'
  const externalIcon = item.external
    ? icon('duotone', 'arrow-up-right-from-square', 'ml-2 h-4 w-4 inline -mt-1')
    : ''
  if (item.external) {
    return `<a href="${escapeHtml(item.href)}" class="${classNames(hidden, state, layout)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name)}${externalIcon}</a>`
  }
  return `<a href="${escapeHtml(item.href)}" class="${classNames(hidden, state, layout)}"${current ? ' aria-current="page"' : ''}>${escapeHtml(item.name)}</a>`
}

function breadcrumbs(
  currentPath: string,
  categorySlug?: string,
): string {
  if (!currentPath.startsWith('/activities')) return ''
  const crumbs = [
    { href: '/activities', label: 'Aktivitas' },
    categorySlug
      ? {
          href: `/activities/${categorySlug}`,
          label:
            getCategoryByCategorySlug(categorySlug).title || 'Semua Aktivitas',
        }
      : null,
  ].filter((crumb): crumb is { href: string; label: string } => crumb !== null)

  const items = crumbs
    .map(
      (crumb) => `<li class="flex"><div class="flex items-center">
<svg class="flex-shrink-0 w-6 h-full text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true"><path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"></path></svg>
<a href="${escapeHtml(crumb.href)}" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">${escapeHtml(crumb.label)}</a>
</div></li>`,
    )
    .join('')

  return `<nav class="flex" aria-label="Breadcrumbs">
<ol class="bg-white rounded-md shadow px-6 flex space-x-4 min-w-full">
<li class="flex"><div class="flex items-center">
<a href="/" class="text-gray-500 hover:text-gray-700">${icon('duotone', 'house', 'flex-shrink-0 h-5 w-5')}<span class="sr-only">Aktivitas</span></a>
</div></li>
${items}
</ol>
</nav>`
}

function layout(options: {
  currentPath: string
  title: string
  categorySlug?: string
  main: string
}): string {
  const desktop = NAV.map((item) => navLink(item, options.currentPath, false)).join('')
  const mobile = NAV.map((item) => navLink(item, options.currentPath, true)).join('')
  return `<div class="min-h-full">
<div class="bg-indigo-600 pb-32">
<nav class="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none fixed w-screen z-10" data-nav>
<div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
<div class="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
<div class="px-2 flex items-center lg:px-0">
<a href="/" class="flex-shrink-0 text-indigo-300 hover:opacity-75" aria-label="Senarai">${icon('duotone', 'grid-2-plus', 'block h-8 w-8')}</a>
<div class="block lg:ml-10"><div class="flex space-x-4">${desktop}</div></div>
</div>
<div class="flex-1 px-2 hidden lg:ml-6 lg:flex lg:justify-end">${searchInput('search')}</div>
<div class="flex lg:hidden">
<button type="button" class="bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" data-menu-button aria-expanded="false" aria-controls="mobile-menu">
<span class="sr-only">Open main menu</span>
${icon('duotone', 'bars', 'h-6 w-6')}
</button>
</div>
</div>
</div>
<div id="mobile-menu" class="lg:hidden hidden" data-menu>
<div class="px-2 pt-2 pb-3 space-y-1">
<div class="mb-4 w-full">${searchInput('search-mobile')}</div>
${mobile}
</div>
</div>
</nav>
<header class="translate-y-11 py-10">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row">
<h1 class="text-3xl font-bold text-white">${escapeHtml(options.title)}</h1>
<div class="mt-4 sm:-mt-1 sm:ml-6">${breadcrumbs(options.currentPath, options.categorySlug)}</div>
</div>
</header>
</div>
<main class="-mt-24">
<div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
${options.main}
</div>
</main>
</div>`
}

function categoryCards(): string {
  const cards = categories
    .map((category, categoryIdx) => {
      const corners = classNames(
        categoryIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
        categoryIdx === 1 ? 'sm:rounded-tr-lg' : '',
        categoryIdx === categories.length - 3 ? 'sm:rounded-bl-lg' : '',
        categoryIdx === categories.length - 1
          ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
          : '',
        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
      )
      return `<div class="${corners}" data-search-item data-search-text="${escapeHtml(`${category.title} ${category.description}`.toLowerCase())}">
<div><span class="${classNames(category.iconBackground, category.iconForeground, 'rounded-lg inline-flex p-3 ring-4 ring-white')}">${icon(category.iconSet, category.iconId, 'h-6 w-6')}</span></div>
<div class="mt-8">
<h2 class="text-lg font-medium"><a href="/activities/${escapeHtml(category.slug)}" class="focus:outline-none"><span class="absolute inset-0" aria-hidden="true"></span>${escapeHtml(category.title)}</a></h2>
<p class="mt-2 text-sm text-gray-500">${escapeHtml(category.description)}</p>
</div>
<span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true"><svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path></svg></span>
</div>`
    })
    .join('')
  return `<div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px" data-search-root>${cards}</div>`
}

function formPrefill(fields: Record<string, string>): string {
  const params = new URLSearchParams({ usp: 'pp_url' })
  for (const [key, value] of Object.entries(fields)) {
    params.set(key, value)
  }
  return `${FORM}?${params.toString()}`
}

function activityCard(activity: Activity, pageCategory?: string): string {
  const category = getCategoryByCategorySlug(activity.categorySlug)
  const searchText = `${activity.nama} ${activity.usia} ${activity.ringkasan}`.toLowerCase()
  const initiallyHidden =
    pageCategory && activity.categorySlug !== pageCategory ? ' hidden' : ''
  const media = activity.image
    ? `<img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src="${escapeHtml(activity.image)}" alt="">`
    : icon(category.iconSet, category.iconId, classNames(category.iconForeground, 'w-16 h-16 flex-shrink-0 mx-auto'))
  const correction = formPrefill({
    'entry.1040472985': activity.usia,
    'entry.105812429': activity.nama,
    'entry.1084985767': activity.ringkasan,
    'entry.1503344235': activity.link,
  })
  const visit = activity.link
    ? `<a href="${escapeHtml(externalHref(activity.link))}" target="_blank" rel="noopener noreferrer" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"><span class="mr-3">Kunjungi</span>${icon('duotone', 'arrow-up-right-from-square', 'w-5 h-5 text-gray-400')}</a>`
    : `<button disabled class="cursor-not-allowed relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg"><span>Belum ada link</span></button>`
  return `<li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200${initiallyHidden}" data-search-item data-category="${escapeHtml(activity.categorySlug)}" data-search-text="${escapeHtml(searchText)}">
<div class="flex-1 flex flex-col p-8">
${media}
<h2 class="mt-6 text-gray-900 text-sm font-medium">${escapeHtml(activity.nama)}</h2>
<dl class="mt-1 flex-grow flex flex-col justify-between">
<dt class="sr-only">Description</dt>
<dd class="text-gray-500 text-sm">${escapeHtml(activity.ringkasan)}</dd>
<dt class="sr-only">Category</dt>
<dd class="mt-3"><a href="/activities/${escapeHtml(activity.categorySlug)}" class="${classNames(category.iconForeground, category.iconBackground, 'px-4 py-2 text-sm font-medium rounded-full hover:text-opacity-75')}">${escapeHtml(category.title)}</a></dd>
</dl>
</div>
<div><div class="-mt-px flex divide-x divide-gray-200">
<div class="w-0 flex-1 flex"><a href="${escapeHtml(correction)}" target="_blank" rel="noopener noreferrer" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">${icon('duotone', 'arrow-up-right-from-square', 'w-5 h-5 text-gray-400')}<span class="ml-3">Koreksi</span></a></div>
<div class="-ml-px w-0 flex-1 flex">${visit}</div>
</div></div>
</li>`
}

function proposeCard(categorySlug: string | undefined): string {
  const category = getCategoryByCategorySlug(categorySlug ?? '')
  const href = formPrefill({ 'entry.1040472985': category.title })
  return `<li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200" data-propose>
<div class="flex-1 flex flex-col p-8">
${icon(category.iconSet, category.iconId, classNames(category.iconForeground, 'w-16 h-16 flex-shrink-0 mx-auto'))}
<h2 class="mt-6 text-gray-900 text-sm font-medium">Tambah Aktivitas Baru</h2>
<dl class="mt-1 flex-grow flex flex-col justify-between">
<dt class="sr-only">Description</dt>
<dd class="text-gray-500 text-sm">Usulkan aktivitas baru untuk kategori ${escapeHtml(category.title)}</dd>
<dt class="sr-only">Category</dt>
<dd class="mt-3"><span class="${classNames(category.iconForeground, category.iconBackground, 'px-4 py-2 text-sm font-medium rounded-full')}">${escapeHtml(category.title)}</span></dd>
</dl>
</div>
<div><div class="-mt-px flex"><div class="w-0 flex-1 flex"><a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"><span class="mr-3">Usulkan</span>${icon('duotone', 'arrow-up-right-from-square', 'w-5 h-5 text-gray-400')}</a></div></div></div>
</li>`
}

function emptyCategory(categorySlug: string): string {
  const category = getCategoryByCategorySlug(categorySlug)
  const href = formPrefill({ 'entry.1040472985': category.title })
  return `<div class="text-center bg-white rounded-lg shadow px-5 py-6 sm:px-6" data-empty hidden>
<div class="${classNames(category.iconBackground, category.iconForeground, 'rounded-xl inline-flex p-4 mb-4 ring-4 ring-white')}">${icon(category.iconSet, category.iconId, 'w-16 h-16 flex-shrink-0 mx-auto')}</div>
<h2 class="mt-2 text-sm font-medium text-gray-900">Belum ada aktivitas ${escapeHtml(category.title)}</h2>
<p class="mt-1 text-sm text-gray-500">Ada usulan? Silakan tambahkan aktivitas untuk ${escapeHtml(category.description)} melalui formulir berikut ini.</p>
<div class="mt-6"><a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">${icon('duotone', 'grid-2-plus', '-ml-1 mr-2 h-5 w-5')}Usulkan Aktivitas</a></div>
</div>`
}

function activityList(
  activities: Activities,
  categorySlug?: string,
): string {
  const cards = activities.map((activity) => activityCard(activity, categorySlug)).join('')
  const propose = categorySlug ? proposeCard(categorySlug) : ''
  const empty = categorySlug ? emptyCategory(categorySlug) : ''
  const scope = categorySlug
    ? ` data-search-scope="category" data-category="${escapeHtml(categorySlug)}"`
    : ` data-search-scope="all"`
  return `<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-search-root${scope}>${cards}${propose}</ul>${empty}`
}

function contactCards(): string {
  const cards = contacts
    .map((contact) => {
      const searchText =
        `${contact.name} ${contact.role} ${contact.description} ${contact.platform}`.toLowerCase()
      return `<li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200" data-search-item data-search-text="${escapeHtml(searchText)}">
<div class="flex-1 flex flex-col p-8">
<img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src="${escapeHtml(contact.image)}" alt="">
<h2 class="mt-6 text-gray-900 text-sm font-medium">${escapeHtml(contact.name)}</h2>
<dl class="mt-1 flex-grow flex flex-col justify-between">
<dt class="sr-only">Description</dt>
<dd class="text-gray-500 text-sm">${escapeHtml(contact.description)}</dd>
<dt class="sr-only">Category</dt>
<dd class="mt-3"><span class="${classNames(contact.foregroundColor, contact.backgroundColor, 'px-4 py-2 text-sm font-medium rounded-full')}">${escapeHtml(contact.role)}</span></dd>
</dl>
</div>
<div><div class="-mt-px flex"><div class="w-0 flex-1 flex"><a href="${escapeHtml(contact.link)}" target="_blank" rel="noopener noreferrer" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"><span class="mr-3">${escapeHtml(contact.platform)}</span>${icon('duotone', 'arrow-up-right-from-square', 'w-5 h-5 text-gray-400')}</a></div></div></div>
</li>`
    })
    .join('')
  return `<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-search-root>${cards}</ul>`
}

export function homePage(): string {
  return document({
    title: 'Senarai',
    description: 'Senarai Belajar Skill Abad 21',
    path: '/',
    body: layout({
      currentPath: '/',
      title: 'Senarai',
      main: categoryCards(),
    }),
  })
}

export function activitiesPage(activities: Activities): string {
  return document({
    title: 'Senarai | Aktivitas',
    description: 'Daftar aktivitas Senarai',
    path: '/activities',
    body: layout({
      currentPath: '/activities',
      title: 'Aktivitas',
      main: activityList(activities),
    }),
  })
}

export function categoryPage(
  activities: Activities,
  categorySlug: string,
): string {
  const category = getCategoryByCategorySlug(categorySlug)
  const description = `Daftar aktivitas ${category.description}`
  return document({
    title: `Senarai | Aktivitas ${category.title}`,
    description,
    path: `/activities/${categorySlug}`,
    body: layout({
      currentPath: `/activities/${categorySlug}`,
      title: 'Aktivitas',
      categorySlug,
      main: activityList(activities, categorySlug),
    }),
  })
}

export function aboutPage(): string {
  return document({
    title: 'Senarai | Tentang Kami',
    description: 'Sekilas tentang kurator Senarai',
    path: '/tentang-kami',
    body: layout({
      currentPath: '/tentang-kami',
      title: 'Tentang Kami',
      main: contactCards(),
    }),
  })
}

export function sitemap(lastUpdated: string, slugs: string[]): string {
  const urls = ['', '/tentang-kami', '/activities', ...slugs.map((slug) => `/activities/${slug}`)]
  const body = urls
    .map(
      (path) => `  <url>
    <loc>${SITE_ORIGIN}${path}</loc>
    <lastmod>${escapeHtml(lastUpdated)}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}
