const { generateListings, ListingService } = require('./listing')
const log = require('./logger')
const { PropertyService } = require('./property')
const { Browser, Website } = require('./website')

const config = {
  property: {
    states: [
      {
        state: 'jalisco',
        cities: ['zapopan'],
      },
    ],
    types: ['apartment'],
    uses: ['rent'],
    websites: ['casasyterrenos'],
  },
}

exports.fetchListing = async (data, context, callback) => {
  const listings = generateListings(config)

  const browser = Browser()
  await browser.open()
  const website = Website(browser)
  const listingService = ListingService(website)

  await Promise.all(
    listings.map(async (listing) => {
      log.info('fetchListing: listing', listing)

      let urls = []
      try {
        urls = await listingService.fetchUrls(listing)
      } catch (error) {
        log.error('fetchListing: error', error)
      }
      log.info('fetchListing: urls', urls)

      return urls
    }),
  )

  // TODO: filter new propertyUrls
  // TODO: publish listing with propertyUrls

  await browser.close()
  callback()
}

exports.fetchProperties = async (data, context, callback) => {
  const { listing, urls } = JSON.parse(data.message.data)

  const browser = Browser()
  await browser.open()
  const website = Website(browser)
  const propertyService = PropertyService(website)

  await Promise.all(
    urls.map(async (url) => {
      log.info('fetchProperties: url', url)

      let property
      try {
        property = await propertyService.fetchProperty(listing, url)
      } catch (error) {
        log.error('fetchProperties: error', error)
      }
      log.info('fetchProperties: property', property)

      return property
    }),
  )

  // TODO: publish listing with properties

  await browser.close()
  callback()
}
