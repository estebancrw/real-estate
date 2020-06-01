const browser = require('./browser')
const Crawler = require('./crawler')
const log = require('./logger')

const run = async () => {
  const lamudiCrawler = Crawler('lamudi')

  const listing = {
    state: 'jalisco',
    city: 'zapopan',
    propertyType: 'house',
    propertyUse: 'sale',
  }

  const properties = await lamudiCrawler.getProperties(listing)
  log.info('run: properties', properties)
}

run()
  .then(() => {
    log.info('run: completed execution')
  })
  .catch((error) => {
    log.error(error)
  })
  .finally(() => {
    browser.close()
  })
