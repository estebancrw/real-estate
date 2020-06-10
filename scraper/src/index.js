const { flatten, take } = require('ramda')
const CrawlerAggregate = require('./crawler')
const dataFile = require('../data.json')
const { generateListings } = require('./property')
const log = require('./logger')
const { getWebsites, parseData } = require('./parse-data')

// takeOne :: a[] -> [a]
const takeOne = take(1)

// propertiesFromListing :: (crawlerAggregate, listing) -> Promise<property[]>
const propertiesFromListing = async (crawlerAggregate, listing) => {
  const links = await crawlerAggregate.getLinks(listing)

  // temporary for testing a single link
  const partialLinks = takeOne(links)
  const properties = await crawlerAggregate.getProperties(partialLinks)

  return properties
}

// propertiesFromListings :: (crawlerAggregate, listing[]) -> Promise<property[]>
const propertiesFromListings = async (crawlerAggregate, listings) => {
  const nestedProperties = await Promise.all(
    listings.map((listing) => propertiesFromListing(crawlerAggregate, listing)),
  )

  return flatten(nestedProperties)
}

// Background Cloud Function
exports.scraper = async (data, context, callback) => {
  const listingData = parseData(dataFile)
  const listings = generateListings(listingData)

  // temporary for testing a single listing
  const partialListings = takeOne(listings)

  const websites = getWebsites(dataFile)
  const crawlerAggregate = CrawlerAggregate(websites)

  let properties
  try {
    properties = await propertiesFromListings(crawlerAggregate, partialListings)
  } catch (error) {
    log.error(error)
    callback(error)
  }

  log.info('run: properties', properties)
  callback()
}
