function PropertyService(website) {
  const fetchProperty = (listing, url) => website.fetchProperty(listing, url)

  return {
    fetchProperty,
  }
}

module.exports = PropertyService
