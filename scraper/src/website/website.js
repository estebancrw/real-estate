const Browser = require('./browser')
const Factory = require('./factory')

function Website() {
  const browser = Browser()

  const fetchListing = async (listing) => {
    const { buildUrl, scraper } = Factory(listing)
    const listingUrl = buildUrl(listing)

    let propertyUrls = []
    try {
      const webpage = await browser.open(listingUrl)
      propertyUrls = await scraper.propertyUrls(webpage)

      await browser.close(webpage)
    } catch (error) {
      console.error(error)
    }

    return propertyUrls
  }

  return {
    fetchListing,
  }
}

module.exports = Website
