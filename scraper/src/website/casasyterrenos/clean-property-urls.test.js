const cleanPropertyUrls = require('./clean-property-urls')

test('cleans property urls from scraped result', () => {
  const result = {
    urls: [
      '/filter/me.html',
      '/propiedad/right.html',
      '/propiedad/right-again.html',
    ],
  }
  const website = 'https://www.casasyterrenos.com'
  const expectedResult = {
    urls: [
      `${website}/propiedad/right.html`,
      `${website}/propiedad/right-again.html`,
    ],
  }

  expect(cleanPropertyUrls(result)).toStrictEqual(expectedResult)
})
