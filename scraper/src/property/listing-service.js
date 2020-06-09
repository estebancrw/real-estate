const { fromPairs, map, pipe, take } = require('ramda')
const Crawler = require('../crawler')
const log = require('../logger')
const Property = require('./property')

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
    const partialLinks = take(1, links)

    const properties = await Promise.all(
      partialLinks.map(async (link) => {
        const propertyValues = await crawler.getProperty(link)
        const property = Property({
          ...listing,
          ...propertyValues,
          link,
        })

        return property
      }),
    )

    return properties
  }

  return {
    getProperties,
  }
}

module.exports = ListingService
