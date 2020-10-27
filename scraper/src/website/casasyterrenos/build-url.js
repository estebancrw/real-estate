const buildUrl = (listing) => {
  const domain = 'www.casasyterrenos.com'
  const protocol = 'https'
  const { location, type, use } = listing
  const { state, city } = location

  const translateType = (type) => {
    const property = {
      apartment: 'departamentos',
    }

    return property[type]
  }

  const translateUse = (use) => {
    const property = {
      rent: 'renta',
    }

    return property[use]
  }

  const translatedType = translateType(type)
  const translatedUse = translateUse(use)

  return `${protocol}://${domain}/${state}/${city}/${translatedType}/${translatedUse}`
}

module.exports = buildUrl
