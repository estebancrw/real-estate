function sitemap() {
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

  const buildLink = (params) => {
    const { state, city, neighbourhood, propertyType, propertyUse } = params

    const type = translatePropertyType(propertyType)
    const use = translatePropertyUse(propertyUse)

    const webpage = neighbourhood
      ? `${website}/${state}/${city}/${neighbourhood}/${type}/${use}`
      : `${website}/${state}/${city}/${type}/${use}`

    return webpage
  }

  return {
    buildLink,
  }
}

module.exports = sitemap()
