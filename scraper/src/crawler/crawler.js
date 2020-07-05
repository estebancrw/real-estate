const browser = require('./browser')
const log = require('../logger')
const { Property, Links } = require('../property')
const { withRateLimit } = require('../rate-limit')
const Scraper = require('./scraper')
const websiteFactory = require('../websites')

function Crawler(websiteName) {
  const website = websiteFactory(websiteName)
  const scraper = Scraper(website)

  // getLinks :: listing -> Promise<link[]>
  const getLinks = async (listing) => {
    log.info('crawler: get property links', listing)
    const link = website.sitemap(listing)
    const page = await browser.getPage({ link })
    const links = await scraper.scrapeListing(page)
    await browser.closePage(page)

    return Links({
      ...listing,
      ...links,
    })
  }

  // getProperty :: link -> Promise<property>
  const getProperty = async (link) => {
    log.info('crawler: get property', link)
    const page = await browser.getPage(link)
    const result = await scraper.scrapeProperty(link, page)
    await browser.closePage(page)

    return Property({
      ...link,
      ...result,
    })
  }

  return {
    getProperty: withRateLimit(getProperty),
    getLinks: withRateLimit(getLinks),
  }
}

module.exports = Crawler
