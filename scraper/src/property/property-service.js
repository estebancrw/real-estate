const { flatten } = require('ramda')
const linkRepository = require('./link-repository')
const log = require('../logger')
const propertyRepository = require('./property-repository')

function PropertyService(crawlerAggregate) {
  const crawler = crawlerAggregate

  // linksFromListing :: listing -> Promise<link[]>
  const linksFromListing = async (listing) => {
    log.info('property-service: get links from listing', listing)
    const links = await crawler.getLinks(listing)

    return linkRepository.filterNonVisited(links)
  }

  // linksFromListings :: listing[] -> Promise<link[]>
  const linksFromListings = async (listings) => {
    const linksList = await Promise.all(
      listings.map((listing) => linksFromListing(listing)),
    )

    return flatten(linksList)
  }

  // propertiesFromLinks :: link[] -> Promise<property[]>
  const propertiesFromLinks = (links) => crawler.getProperties(links)

  // commit :: (link[], property[]) -> Promise<void>
  const commit = async (links, properties) => {
    log.info('property-service: store properties', properties)
    await propertyRepository.addAll(properties)

    log.info('property-service: store links', links)
    await linkRepository.addAll(links)

    // perhaps crawler.close() here
  }

  return {
    commit,
    propertiesFromLinks,
    linksFromListing,
    linksFromListings,
  }
}

module.exports = PropertyService
