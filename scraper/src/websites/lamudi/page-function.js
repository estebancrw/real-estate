/* eslint-env browser */

const pageFn = (property) => {
  const safePipe = (...fns) => (prop) => {
    return fns.reduce((value, fn) => {
      if (value === null) {
        return null
      }

      return fn(value)
    }, prop)
  }
  const map = (fn) => (list) => list.map(fn)

  const queryDocument = (selector) => () => document.querySelector(selector)
  const queryAllDocument = (selector) => () =>
    Array.from(document.querySelectorAll(selector))
  const queryElement = (selector) => (element) =>
    element.querySelector(selector)
  const parentElement = (element) => element.parentElement
  const nextSiblingElement = (element) => element.nextElementSibling
  const textContent = (element) => element.textContent
  const href = (element) => element.href

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
