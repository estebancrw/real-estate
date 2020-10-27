const Factory = require('./factory')

test('builds casasyterrenos object with all properties', () => {
  const website = 'casasyterrenos'
  const listing = {
    website,
  }
  const { buildUrl, scraper } = Factory(listing)

  expect(typeof buildUrl).toBe('function')
  expect(typeof scraper).toBe('object')
})
