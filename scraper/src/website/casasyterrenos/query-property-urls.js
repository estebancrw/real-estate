/* eslint-env browser */

const queryPropertyUrls = () => {
  const selectorSidebar = '.sidebar'
  const selectorHref = 'a[href]'
  const hrefAttribute = 'href'

  const sidebarElement = document.querySelector(selectorSidebar)
  const hrefElements = Array.from(sidebarElement.querySelectorAll(selectorHref))

  const urls = hrefElements.map((hrefElement) =>
    hrefElement.getAttribute(hrefAttribute),
  )

  return {
    urls,
  }
}

module.exports = queryPropertyUrls
