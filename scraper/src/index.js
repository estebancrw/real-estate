const { take } = require('ramda')
const data = require('../data.json')
const { generateListings, ListingService } = require('./property')
const log = require('./logger')
const { getWebsites, parseData } = require('./parse-data')

const run = async () => {
  const listingData = parseData(data)
  const listings = generateListings(listingData)

  const partialListings = take(1, listings)

  const websites = getWebsites(data)
  const listingService = ListingService(websites)

  await Promise.all(
    partialListings.map(async (listing) => {
      const properties = await listingService.getProperties(listing)
      log.info('run: properties', properties)
    }),
  )
}

run()
  .then(() => {
    log.info('run: completed execution')
  })
  .catch((error) => {
    log.error(error)
  })
