const { fromPairs } = require('ramda')
const log = require('../logger')
const { propertyValues } = require('../property')

function Scraper(rules) {
  const scrapeText = async (value, page) => {
    log.debug('scraper: scrape value', value)
    const { selector, pickFunction } = rules[value]

    let text
    try {
      if (value === 'links') {
        text = await page.$$eval(selector, pickFunction)
      } else {
        text = await page.$eval(selector, pickFunction)
      }
    } catch (error) {
      log.warn('scraper: value not found', value)
      text = null
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

    if (result === null) {
      return [value, result]
    }

    const text = cleanText(value, result)

    return [value, text]
  }

  const scrape = async (values, page) => {
    log.debug('scraper: scrape values', values)
    const keyValuePairs = await Promise.all(
      values.map((value) => scrapeAndCleanText(value, page)),
    )

    return fromPairs(keyValuePairs)
  }

  const scrapeListing = (page) => scrape(propertyValues.listing, page)
  const scrapeProperty = ({ type }, page) => scrape(propertyValues[type], page)

  return {
    scrapeListing,
    scrapeProperty,
  }
}

module.exports = Scraper
