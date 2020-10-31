const generateListings = require('./generate-listings')

test('generates a list of listings', () => {
  const data = {
    property: {
      states: [
        {
          state: 'jalisco',
          cities: ['guadalajara', 'zapopan'],
        },
      ],
      types: ['apartment'],
      uses: ['rent'],
      websites: ['casasyterrenos'],
    },
  }
  const listings = [
    {
      city: 'guadalajara',
      state: 'jalisco',
      type: 'apartment',
      use: 'rent',
      website: 'casasyterrenos',
    },
    {
      city: 'zapopan',
      state: 'jalisco',
      type: 'apartment',
      use: 'rent',
      website: 'casasyterrenos',
    },
  ]

  expect(generateListings(data)).toStrictEqual(listings)
})
