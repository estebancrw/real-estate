const { basename } = require('path')
const { prop } = require('ramda')
const Details = require('./details')
const Location = require('./location')
const Listing = require('./listing')

function Property(params) {
  const extensionName = '.html'

  const link = prop('link', params)
  const price = prop('price', params)

  const details = Details(params)

  const location = Location(params)
  const listing = Listing(params)

  const id = basename(link, extensionName)

  // image[]
  // timestamp? date? scrape + publish

  return {
    id,
    details,
    location,
    link,
    listing,
    price,
  }
}

module.exports = Property
