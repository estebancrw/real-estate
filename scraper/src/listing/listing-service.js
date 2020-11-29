const { splitEvery } = require('ramda')

function ListingService({ publisher, tracing, website }) {
  const slicesNumber = 20

  const fetchUrls = async (listing) => {
    const context = {
      ...listing,
      name: 'fetch urls',
    }
    const span = tracing.startSpan(context)
    const urls = await website.fetchListing(listing)
    tracing.finishSpan(span)

    return urls
  }

  const publishUrls = async (listing, allUrls) => {
    const context = {
      ...listing,
      name: 'publish urls',
    }
    const span = tracing.startSpan(context)
    const urlSlices = splitEvery(slicesNumber, allUrls)
    const listingUrlSlices = urlSlices.map((urls) => ({
      listing,
      urls,
    }))

    await publisher.publishMultiple(listingUrlSlices)
    tracing.finishSpan(span)
  }

  return {
    fetchUrls,
    publishUrls,
  }
}

module.exports = ListingService
