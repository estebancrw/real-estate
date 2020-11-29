function PropertyService({ tracing, website }) {
  const fetchProperty = async (listing, url) => {
    const context = {
      ...listing,
      url,
      name: 'fetch property',
    }
    const span = tracing.startSpan(context)
    const property = await website.fetchProperty(listing, url)
    tracing.finishSpan(span)

    return property
  }

  return {
    fetchProperty,
  }
}

module.exports = PropertyService
