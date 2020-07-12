/* eslint-env browser */

const pageFn = (property) => {
  const { map, safePipe } = window.controlFn
  const { queryAllDocument, queryDocument } = window.documentFn
  const {
    href,
    nextSiblingElement,
    parentElement,
    queryElement,
    textContent,
  } = window.elementFn

  // linksFn :: void -> string[]
  const linksFn = safePipe(
    queryAllDocument('.ListingCell-moreInfo-button-v2_redesign'),
    map(href),
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

  // apartment :: void -> object
  const apartment = () => {
    const bathrooms = bathroomsFn()
    const bedrooms = bedroomsFn()
    const buildingSize = buildingSizeFn()
    const price = priceFn()

    return {
      bathrooms,
      bedrooms,
      buildingSize,
      price,
    }
  }

  // house :: void -> object
  const house = () => {
    const bathrooms = bathroomsFn()
    const bedrooms = bedroomsFn()
    const buildingSize = buildingSizeFn()
    const landSize = landSizeFn()
    const price = priceFn()

    return {
      bathrooms,
      bedrooms,
      buildingSize,
      landSize,
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
    const price = priceFn()

    return {
      landSize,
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
