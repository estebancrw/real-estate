const { flatten } = require('ramda')
const Listing = require('./listing')

// generateListings :: data -> listing[]
const generateListings = ({ states, types, uses, websites }) => {
  const listings = states.map(({ state, cities }) =>
    cities.map((city) =>
      types.map((type) =>
        uses.map((use) =>
          websites.map((website) =>
            Listing({ city, state, type, use, website }),
          ),
        ),
      ),
    ),
  )

  return flatten(listings)
}

module.exports = generateListings
