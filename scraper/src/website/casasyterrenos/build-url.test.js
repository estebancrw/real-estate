const buildUrl = require('./build-url')

test('builds a url from a listing', () => {
  const listing = {
    location: {
      city: 'guadalajara',
      state: 'jalisco',
    },
    type: 'apartment',
    use: 'rent',
    website: 'casasyterrenos',
  }
  const url =
    'https://www.casasyterrenos.com/jalisco/guadalajara/departamentos/renta'

  expect(buildUrl(listing)).toBe(url)
})
