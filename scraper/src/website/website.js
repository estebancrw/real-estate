const Factory = require('./factory')
const log = require('../logger')

function Website(browser) {
  const fetchListing = async (listing) => {
    const { buildUrl, scraper } = Factory(listing)
    const listingUrl = buildUrl(listing)

    let propertyUrls = []
    try {
      const webpage = await browser.openPage(listingUrl)
      propertyUrls = await scraper.propertyUrls(webpage)

      await browser.closePage(webpage)
    } catch (error) {
      log.error('website: error', error)
    }

    return propertyUrls
  }

  const fetchProperty = async (listing, url) => {
    const { scraper } = Factory(listing)
    const { type } = listing
    const scraperFn = scraper[type]

    let property = {}
    try {
      const webpage = await browser.openPage(url)
      property = await scraperFn(webpage)

      await browser.closePage(webpage)
    } catch (error) {
      log.error('website: error', error)
    }

    return property
  }

  return {
    fetchListing,
    fetchProperty,
  }
}

module.exports = Website
