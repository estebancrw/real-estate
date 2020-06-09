const browser = require('./browser')
const log = require('../logger')
const { Property, Links } = require('../property')
const { withRateLimit } = require('../rate-limit')
const Scraper = require('./scraper')
const websiteFactory = require('../websites')

function Crawler(website) {
  const { rules, sitemap } = websiteFactory(website)
  const scraper = Scraper(rules)

  // getLinks :: listing -> Promise<link[]>
  const getLinks = async (listing) => {
    log.info('crawler: get property links', listing)
    const link = sitemap.buildLink(listing)
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
    const values = await scraper.scrapeProperty(page)
    await browser.closePage(page)

    return Property({
      ...link,
      ...values,
    })
  }

  return {
    getProperty: withRateLimit(getProperty),
    getLinks: withRateLimit(getLinks),
  }
}

module.exports = Crawler
