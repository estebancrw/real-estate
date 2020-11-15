function ListingService(publisher, website) {
  const fetchUrls = (listing) => website.fetchListing(listing)

  const publishUrls = (listing, urls) =>
    publisher.publish({
      listing,
      urls,
    })

  return {
    fetchUrls,
    publishUrls,
  }
}

module.exports = ListingService
