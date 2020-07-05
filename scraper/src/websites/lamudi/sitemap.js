function sitemap(params) {
  const website = 'https://www.lamudi.com.mx'

  const translatePropertyType = (type) => {
    const property = {
      apartment: 'departamento',
      house: 'casa',
      land: 'terreno',
    }

    return property[type]
  }

  const translatePropertyUse = (use) => {
    const property = {
      rent: 'for-rent',
      sale: 'for-sale',
    }

    return property[use]
  }

  const buildLink = (sitemapParams) => {
    const { city, neighbourhood, state, type, use } = sitemapParams

    const translatedType = translatePropertyType(type)
    const translatedUse = translatePropertyUse(use)

    const webpage = neighbourhood
      ? `${website}/${state}/${city}/${neighbourhood}/${translatedType}/${translatedUse}`
      : `${website}/${state}/${city}/${translatedType}/${translatedUse}`

    return webpage
  }

  return buildLink(params)
}

module.exports = sitemap
