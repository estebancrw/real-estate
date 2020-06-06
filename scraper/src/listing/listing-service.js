const { fromPairs, map, pipe } = require('ramda')
const Crawler = require('../crawler')
const log = require('../logger')

function ListingService(websites) {
  // initializeCrawlers :: website[] -> crawler[]
  const initializeCrawlers = pipe(
    map((website) => [website, Crawler(website)]),
    fromPairs,
  )
  const crawlers = initializeCrawlers(websites)

  // getProperties :: listing -> Promise<property[]>
  const getProperties = async (listing) => {
    log.info('listing-service: get properties', listing)
    const { website } = listing
    const crawler = crawlers[website]

    const links = await crawler.getLinks(listing)

    const properties = await Promise.all(
      links.map((link) => crawler.getProperty(listing, link)),
    )

    return properties
  }

  return {
    getProperties,
  }
}

module.exports = ListingService
