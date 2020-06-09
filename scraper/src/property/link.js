const { pick } = require('ramda')
const Listing = require('./listing')

function Link(params) {
  const keys = ['link']

  // pickLink :: params -> { link }
  const pickLink = pick(keys)

  const link = pickLink(params)
  const listing = Listing(params)

  return {
    ...link,
    ...listing,
  }
}

module.exports = Link
