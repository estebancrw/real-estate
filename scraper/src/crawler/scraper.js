const log = require('../logger')

function Scraper({ clean, pageFn }) {
  // query :: (string, page) -> Promise<object>
  const query = async (type, page) => {
    log.debug('scraper: type', type)

    const result = await page.evaluate(pageFn, type)
    log.debug('scraper: evaluate result', result)

    const cleanResult = clean(type, result)
    log.debug('scraper: clean result', cleanResult)

    return cleanResult
  }

  // scrapeProperty :: ({ type }, page) -> Promise<object>
  const scrapeProperty = ({ type }, page) => query(type, page)

  // scrapeListing :: (page) -> Promise<object>
  const scrapeListing = (page) => query('listing', page)

  return {
    scrapeProperty,
    scrapeListing,
  }
}

module.exports = Scraper
