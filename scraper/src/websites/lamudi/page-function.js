/* eslint-env browser */

const pageFn = (property) => {
  const { map, safePipe } = window.controlFn
  const { queryAllDocument, queryDocument } = window.documentFn
  const {
    attribute,
    nextSiblingElement,
    parentElement,
    queryElement,
    textContent,
  } = window.elementFn

  // linksFn :: void -> string[]
  const linksFn = safePipe(
    queryAllDocument('.ListingCell-moreInfo-button-v2_redesign'),
    map(attribute('href')),
  )

  // bathroomsFn :: void -> string
  const bathroomsFn = safePipe(
    queryDocument('#listing-details'),
    queryElement('.icon-bathrooms'),
    parentElement,
    nextSiblingElement,
    textContent,
  )

  // priceFn :: void -> string
  const priceFn = safePipe(queryDocument('.FirstPrice'), textContent)

  // bedroomsFn :: void -> string
  const bedroomsFn = safePipe(
    queryDocument('#listing-details'),
    queryElement('.icon-bedrooms'),
    parentElement,
    nextSiblingElement,
    textContent,
  )

  // buildingSizeFn :: void -> string
  const buildingSizeFn = safePipe(
    queryDocument('#listing-details'),
    queryElement('.icon-livingsize'),
    parentElement,
    nextSiblingElement,
    textContent,
  )

  // landSizeFn :: void -> string
  const landSizeFn = safePipe(
    queryDocument('#listing-details'),
    queryElement('.icon-land-size'),
    parentElement,
    nextSiblingElement,
    textContent,
  )

  // latitudeFn :: void -> string
  const latitudeFn = safePipe(
    queryDocument('#js-landmark-widget-pdp-container'),
    attribute('data-lat'),
  )

  // longitudeFn :: void -> string
  const longitudeFn = safePipe(
    queryDocument('#js-landmark-widget-pdp-container'),
    attribute('data-lon'),
  )

  // apartment :: void -> object
  const apartment = () => {
    const bathrooms = bathroomsFn()
    const bedrooms = bedroomsFn()
    const buildingSize = buildingSizeFn()
    const latitude = latitudeFn()
    const longitude = longitudeFn()
    const price = priceFn()

    return {
      bathrooms,
      bedrooms,
      buildingSize,
      latitude,
      longitude,
      price,
    }
  }

  // house :: void -> object
  const house = () => {
    const bathrooms = bathroomsFn()
    const bedrooms = bedroomsFn()
    const buildingSize = buildingSizeFn()
    const landSize = landSizeFn()
    const latitude = latitudeFn()
    const longitude = longitudeFn()
    const price = priceFn()

    return {
      bathrooms,
      bedrooms,
      buildingSize,
      landSize,
      latitude,
      longitude,
      price,
    }
  }

  // listing :: void -> object
  const listing = () => {
    const links = linksFn()

    return {
      links,
    }
  }

  // land :: void -> object
  const land = () => {
    const landSize = landSizeFn()
    const latitude = latitudeFn()
    const longitude = longitudeFn()
    const price = priceFn()

    return {
      landSize,
      latitude,
      longitude,
      price,
    }
  }

  if (property === 'apartment') {
    return apartment()
  }
  if (property === 'house') {
    return house()
  }
  if (property === 'listing') {
    return listing()
  }
  if (property === 'land') {
    return land()
  }

  return null
}

module.exports = pageFn
