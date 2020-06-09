const { and, fromPairs, has, prop } = require('ramda')
const log = require('../logger')

function Scraper(rules) {
  // hasMultipleElements :: rule -> boolean
  const hasMultipleElements = and(
    has('multipleElements'),
    prop('multipleElements'),
  )

  // scrapeText :: (rule, page) -> Promise<string>
  const scrapeText = async (rule, page) => {
    const { selector, name, pickFunction } = rule
    log.debug('scraper: text', name)

    let text
    try {
      if (hasMultipleElements(rule)) {
        text = await page.$$eval(selector, pickFunction)
      } else {
        text = await page.$eval(selector, pickFunction)
      }
    } catch (error) {
      log.warn('scraper: value not found', name)
      text = null
    }

    return text
  }

  // cleanText :: (rule, string) -> string
  const cleanText = (rule, text) => {
    const { clean, name } = rule

    if (clean) {
      log.debug('scraper: clean', name)
      return clean(text)
    }

    return text
  }

  // scrapeAndCleanText :: (rule, page) -> Promise<string>
  const scrapeAndCleanText = async (rule, page) => {
    const result = await scrapeText(rule, page)

    if (result === null) {
      return result
    }

    const text = cleanText(rule, result)

    return text
  }

  // query :: string -> page -> Promise<valuesObject>
  const query = (type) => async (page) => {
    log.debug('scraper: query values of', type)
    const typeRules = rules[type]

    const keyValuePairs = await Promise.all(
      typeRules.map(async (rule) => {
        const result = await scrapeAndCleanText(rule, page)
        const { name } = rule

        return [name, result]
      }),
    )

    return fromPairs(keyValuePairs)
  }

  // scrapeListing :: page -> Promise<valuesObject>
  const scrapeListing = query('listing')

  // scrapeProperty :: page -> Promise<valuesObject>
  const scrapeProperty = query('property')

  return {
    scrapeListing,
    scrapeProperty,
  }
}

module.exports = Scraper
