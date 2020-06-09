const { prop } = require('ramda')
const Details = require('./details')
const Listing = require('./listing')

function Property(params) {
  const link = prop('link', params)
  const price = prop('price', params)

  // TODO: add buildingSize
  const details = Details(params)

  const listing = Listing(params)
  // image[]
  // location
  // valuesToScrape?
  // timestamp? date? scrape + publish

  return {
    details,
    link,
    listing,
    price,
  }
}

module.exports = Property
