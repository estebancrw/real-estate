const { fromPairs } = require('ramda')
const log = require('./logger')
const property = require('./property')

function Scraper(rules) {
  const scrapeText = async (value, page) => {
    log.debug('scraper: scrape value', value)
    const { selector, pickFunction } = rules[value]

    let text
    if (value === 'links') {
      text = await page.$$eval(selector, pickFunction)
    } else {
      text = await page.$eval(selector, pickFunction)
    }

    return text
  }

  const cleanText = (value, text) => {
    const { clean } = rules[value]

    if (clean) {
      log.debug('scraper: clean value', value)
      return clean(text)
    }

    return text
  }

  const scrapeAndCleanText = async (value, page) => {
    const result = await scrapeText(value, page)
    const text = cleanText(value, result)

    return [value, text]
  }

  const query = async (values, page) => {
    log.debug('scraper: query values', values)
    const keyValuePairs = await Promise.all(
      values.map((value) => scrapeAndCleanText(value, page)),
    )

    return fromPairs(keyValuePairs)
  }

  const scrapeListing = (page) => query(property.listing, page)
  const scrapeProperty = (type, page) => query(property[type], page)

  return {
    scrapeListing,
    scrapeProperty,
  }
}

module.exports = Scraper
