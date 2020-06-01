const limit = require('./promise-limit')
const browser = require('./browser')
const log = require('./logger')
const Scraper = require('./scraper')
const websiteFactory = require('./websites')

function Crawler(website) {
  const { rules, sitemap } = websiteFactory(website)
  const scraper = Scraper(rules)

  // getPropertyLinks :: listing -> Promise<link[]>
  const getPropertyLinks = async (listing) => {
    log.info('crawler: get property links', listing)
    const listingLink = sitemap.buildLink(listing)
    const page = await browser.getPage(listingLink)
    const { links } = await scraper.scrapeListing(page)

    return links
  }

  // getProperty :: (type, link) -> Promise<property>
  const getProperty = async (type, link) => {
    log.info('crawler: get property', link)
    const page = await browser.getPage(link)

    return scraper.scrapeProperty(type, page)
  }

  // getPropertyWithLimit :: (type, link) -> Promise<property>
  const getPropertyWithLimit = async (type, link) =>
    limit(() => getProperty(type, link))

  // getProperties :: listing -> Promise<property[]>
  const getProperties = async (listing) => {
    log.info('crawler: get properties')
    const { propertyType } = listing
    const links = await getPropertyLinks(listing)

    return Promise.all(
      links.map((link) => getPropertyWithLimit(propertyType, link)),
    )
  }

  return {
    getProperties,
    getProperty,
    getPropertyWithLimit,
    getPropertyLinks,
  }
}

module.exports = Crawler
