const { pick } = require('ramda')

function Listing(params) {
  const keys = ['city', 'state', 'type', 'use', 'website']

  // pickListing :: params -> listing
  const pickListing = pick(keys)

  return pickListing(params)
}

module.exports = Listing
