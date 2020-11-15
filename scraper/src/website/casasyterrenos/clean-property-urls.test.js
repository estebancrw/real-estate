const cleanPropertyUrls = require('./clean-property-urls')

test('cleans property urls from scraped result', () => {
  const urls = [
    '/filter/me.html',
    '/propiedad/right.html',
    '/propiedad/right-again.html',
  ]
  const website = 'https://www.casasyterrenos.com'
  const cleanUrls = [
    `${website}/propiedad/right.html`,
    `${website}/propiedad/right-again.html`,
  ]

  expect(cleanPropertyUrls(urls)).toStrictEqual(cleanUrls)
})
