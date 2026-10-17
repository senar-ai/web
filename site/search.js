const roots = document.querySelectorAll('[data-search-root]')
const inputs = document.querySelectorAll('[data-search]')
const button = document.querySelector('[data-menu-button]')
const menu = document.querySelector('[data-menu]')

function applySearch(keyword) {
  const query = keyword.trim().toLowerCase()
  for (const input of inputs) {
    if (input.value !== keyword) input.value = keyword
  }
  for (const root of roots) {
    const scope = root.getAttribute('data-search-scope')
    const pageCategory = root.getAttribute('data-category')
    let visible = 0
    for (const item of root.querySelectorAll('[data-search-item]')) {
      const text = item.getAttribute('data-search-text') || ''
      const itemCategory = item.getAttribute('data-category')
      const inCategory =
        scope === 'category' && !query
          ? itemCategory === pageCategory
          : true
      const matches = !query || text.includes(query)
      const show = inCategory && matches
      item.hidden = !show
      item.classList.toggle('hidden', !show)
      if (show && item.hasAttribute('data-category')) visible += 1
    }
    const empty = root.parentElement?.querySelector('[data-empty]')
    if (empty) empty.hidden = visible !== 0
    const propose = root.querySelector('[data-propose]')
    if (propose) propose.hidden = query.length > 0
  }
}

for (const input of inputs) {
  input.addEventListener('input', () => applySearch(input.value))
}

applySearch('')

if (button && menu) {
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false
    button.setAttribute('aria-expanded', String(open))
  })
}
