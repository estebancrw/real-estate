const CrawlerAggregate = require('./crawler')
const dataFile = require('../data.json')
const { generateListings, PropertyService } = require('./property')
const log = require('./logger')
const { getWebsites, parseData } = require('./parse-data')

// Background Cloud Function
exports.scraper = async (data, context, callback) => {
  const listingData = parseData(dataFile)
  const listings = generateListings(listingData)

  const websites = getWebsites(dataFile)
  const crawlerAggregate = CrawlerAggregate(websites)
  const propertyService = PropertyService(crawlerAggregate)

  try {
    const links = await propertyService.linksFromListings(listings)
    const properties = await propertyService.propertiesFromLinks(links)

    await propertyService.commit(links, properties)
  } catch (error) {
    log.error(error)
    callback(error)
  }

  callback()
}
