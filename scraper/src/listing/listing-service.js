const { splitEvery } = require('ramda')

function ListingService(publisher, website) {
  const slicesNumber = 20

  const fetchUrls = (listing) => website.fetchListing(listing)

  const publishUrls = (listing, allUrls) => {
    const urlSlices = splitEvery(slicesNumber, allUrls)
    const listingUrlSlices = urlSlices.map((urls) => ({
      listing,
      urls,
    }))

    return publisher.publishMultiple(listingUrlSlices)
  }

  return {
    fetchUrls,
    publishUrls,
  }
}

module.exports = ListingService
