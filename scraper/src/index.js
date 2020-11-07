const { generateListings, ListingService } = require('./listing')
const { PropertyService } = require('./property')
const Website = require('./website')

const website = Website()

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
  const listingService = ListingService(website)

  listings.map(async (listing) => {
    console.log(listing)

    const propertyUrls = await listingService.fetchUrls(listing)
    console.log(propertyUrls)
  })

  // TODO: filter new propertyUrls
  // TODO: publish listing with propertyUrls

  callback()
}

exports.fetchProperties = async (data, context, callback) => {
  const { listing, urls } = JSON.parse(data.message.data)

  const propertyService = PropertyService(website)

  urls.map(async (url) => {
    console.log(url)

    const property = await propertyService.fetchProperty(listing, url)
    console.log(property)
  })

  // TODO: publish listing with properties

  callback()
}
