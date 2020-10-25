const { flatten } = require('ramda')
const Listing = require('./listing')

const generateListings = (data) => {
  const { property } = data
  const { states, types, uses, websites } = property

  const listings = states.map(({ state, cities }) =>
    cities.map((city) =>
      types.map((type) =>
        uses.map((use) =>
          websites.map((website) =>
            Listing({ state, city, type, use, website }),
          ),
        ),
      ),
    ),
  )

  return flatten(listings)
}

module.exports = generateListings
