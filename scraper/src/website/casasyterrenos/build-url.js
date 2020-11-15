const buildUrl = (listing) => {
  const domain = 'www.casasyterrenos.com'
  const protocol = 'https'
  const { city, state, type, use } = listing

  const translateType = (propertyType) => {
    const property = {
      apartment: 'departamentos',
    }

    return property[propertyType]
  }

  const translateUse = (propertyUse) => {
    const property = {
      rent: 'renta',
    }

    return property[propertyUse]
  }

  const translatedType = translateType(type)
  const translatedUse = translateUse(use)

  return `${protocol}://${domain}/${state}/${city}/${translatedType}/${translatedUse}`
}

module.exports = buildUrl
