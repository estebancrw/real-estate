const { isNil, join, lensProp, match, over, pipe, view } = require('ramda')

// matchNumbers :: string -> string
const matchNumbers = pipe(match(/[0-9]/g), join(''))

// parseDecimal :: string -> number
const parseDecimal = (numberString) => parseInt(numberString, 10)

// matchAndParseNumbers :: string -> number
const matchAndParseNumbers = pipe(matchNumbers, parseDecimal)

function clean(propertyType, scrapedProperty) {
  // safeClean :: (string, fn) -> object -> object
  const safeClean = (field, cleanFn) => (property) => {
    const fieldLens = lensProp(field)
    const value = view(fieldLens, property)

    if (isNil(value)) {
      return property
    }

    return over(fieldLens, cleanFn, property)
  }

  // bathroomsFn :: object -> object
  const bathroomsFn = safeClean('bathrooms', matchAndParseNumbers)

  // bedroomsFn :: object -> object
  const bedroomsFn = safeClean('bedrooms', matchAndParseNumbers)

  // buildingSizeFn :: object -> object
  const buildingSizeFn = safeClean('buildingSize', matchAndParseNumbers)

  // priceFn :: object -> object
  const priceFn = safeClean('price', matchAndParseNumbers)

  // cleanApartment :: object -> object
  const cleanApartment = pipe(bathroomsFn, bedroomsFn, buildingSizeFn, priceFn)

  // cleanHouse :: object -> object
  const cleanHouse = pipe(bathroomsFn, bedroomsFn, buildingSizeFn, priceFn)

  // cleanListing :: object -> object
  const cleanListing = (property) => property

  // cleanLand :: object -> object
  const cleanLand = priceFn

  if (propertyType === 'apartment') {
    return cleanApartment(scrapedProperty)
  }
  if (propertyType === 'house') {
    return cleanHouse(scrapedProperty)
  }
  if (propertyType === 'listing') {
    return cleanListing(scrapedProperty)
  }
  if (propertyType === 'land') {
    return cleanLand(scrapedProperty)
  }

  return null
}

module.exports = clean