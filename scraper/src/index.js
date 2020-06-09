const { take } = require('ramda')
const CrawlerAggregate = require('./crawler')
const data = require('../data.json')
const { generateListings } = require('./property')
const log = require('./logger')
const { getWebsites, parseData } = require('./parse-data')

const run = async () => {
  const listingData = parseData(data)
  const listings = generateListings(listingData)

  const partialListings = take(1, listings)

  const websites = getWebsites(data)
  const crawlerAggregate = CrawlerAggregate(websites)

  await Promise.all(
    partialListings.map(async (listing) => {
      const links = await crawlerAggregate.getLinks(listing)

      const partialLinks = take(1, links)

      const properties = await crawlerAggregate.getProperties(partialLinks)

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
