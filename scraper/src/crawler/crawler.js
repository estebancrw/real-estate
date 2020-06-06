const browser = require('./browser')
const log = require('../logger')
const { withRateLimit } = require('../rate-limit')
const Scraper = require('./scraper')
const websiteFactory = require('../websites')

function Crawler(website) {
  const { rules, sitemap } = websiteFactory(website)
  const scraper = Scraper(rules)

  // getLinks :: listing -> Promise<link[]>
  const getLinks = async (listing) => {
    log.info('crawler: get property links', listing)
    const listingLink = sitemap.buildLink(listing)
    const page = await browser.getPage(listingLink)
    const { links } = await scraper.scrapeListing(page)
    await browser.closePage(page)

    return links
  }

  // getProperty :: (listing, link) -> Promise<property>
  const getProperty = async (listing, link) => {
    log.info('crawler: get property', link)
    const page = await browser.getPage(link)
    const property = await scraper.scrapeProperty(listing, page)
    await browser.closePage(page)

    return property
  }

  return {
    getProperty: withRateLimit(getProperty),
    getLinks: withRateLimit(getLinks),
  }
}

module.exports = Crawler
