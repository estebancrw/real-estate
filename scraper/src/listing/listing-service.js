function ListingService(website) {
  const fetchUrls = (listing) => website.fetchListing(listing)

  return {
    fetchUrls,
  }
}

module.exports = ListingService
