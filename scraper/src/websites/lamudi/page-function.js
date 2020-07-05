/* eslint-env browser */

const pageFn = (property) => {
  // linksFn :: void -> string[]
  const linksFn = () => {
    const selector = '.ListingCell-moreInfo-button-v2_redesign'
    const elements = Array.from(document.querySelectorAll(selector))

    if (elements === null) {
      return null
    }

    const hrefs = elements.map((element) => element.href)

    return hrefs
  }

  // priceFn :: void -> string
  const priceFn = () => {
    const selector = '.FirstPrice'
    const element = document.querySelector(selector)

    if (element === null) {
      return null
    }

    return element.textContent
  }

  // bathroomsFn :: void -> string
  const bathroomsFn = () => {
    const selector = 'div > i.icon-bathrooms'
    const element = document.querySelector(selector)

    if (element === null) {
      return null
    }

    return element.nextElementSibling.textContent
  }

  // bedroomsFn :: void -> string
  const bedroomsFn = () => {
    const selector = 'div > i.icon-bedrooms'
    const element = document.querySelector(selector)

    if (element === null) {
      return null
    }

    return element.nextElementSibling.textContent
  }

  // buildingSizeFn :: void -> string
  const buildingSizeFn = () => {
    const selector = 'div > i.icon-livingsize'
    const element = document.querySelector(selector)

    if (element === null) {
      return null
    }

    return element.nextElementSibling.textContent
  }

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
    const price = priceFn()

    return {
      bathrooms,
      bedrooms,
      buildingSize,
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
    const price = priceFn()

    return {
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
