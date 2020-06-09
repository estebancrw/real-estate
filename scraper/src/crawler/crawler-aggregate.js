const { fromPairs, map, pipe } = require('ramda')
const Crawler = require('./crawler')

function CrawlerAggregate(websites) {
  // crawlerPair :: string -> [string, Crawler]
  const crawlerPair = (website) => [website, Crawler(website)]

  // createCrawler :: string[] -> crawlers
  const createCrawler = pipe(map(crawlerPair), fromPairs)

  const crawler = createCrawler(websites)

  // getCrawler :: { website } -> crawler
  const getCrawler = ({ website }) => crawler[website]

  // getLinks :: listing -> Promise<link[]>
  const getLinks = (listing) => getCrawler(listing).getLinks(listing)

  // getProperty :: link -> Promise<property>
  const getProperty = (link) => getCrawler(link).getProperty(link)

  // getProperties :: links[] -> Promise<property[]>
  const getProperties = pipe(map(getProperty), (promises) =>
    Promise.all(promises),
  )

  return {
    crawler,
    crawlerPair,
    createCrawler,
    getCrawler,
    getLinks,
    getProperty,
    getProperties,
  }
}

module.exports = CrawlerAggregate
