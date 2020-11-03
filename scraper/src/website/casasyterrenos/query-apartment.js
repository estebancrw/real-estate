/* eslint-env browser */

const queryApartment = () => {
  const findAmenityText = (text, amenityElements) => {
    const amenityElement = amenityElements.find(
      ({ textContent }) => textContent === text,
    )
    return amenityElement.previousSibling.textContent
  }
  const findUnitText = (text, unitElements) => {
    const unitElement = unitElements.find(
      (element) => element.nextSibling.textContent === text,
    )
    return unitElement.textContent
  }

  const selectorAmenity = '.amenityName'
  const amenityElements = Array.from(document.querySelectorAll(selectorAmenity))

  const bathrooms = findAmenityText('Baños', amenityElements)
  const bedrooms = findAmenityText('Habitaciones', amenityElements)
  const parkingSlots = findAmenityText('Estacionamientos', amenityElements)

  const selectorPrice = '.primaryprice'
  const priceElement = document.querySelector(selectorPrice)
  const price = priceElement.textContent

  const selectorUnit = '.unit'
  const unitElements = Array.from(document.querySelectorAll(selectorUnit))
  const buildSize = findUnitText('Construcción', unitElements)
  const plotSize = findUnitText('Terreno', unitElements)

  const locationSelector = 'a > li'
  const locationElements = Array.from(
    document.querySelectorAll(locationSelector),
  )
  const neighbourhood = locationElements.pop().textContent

  return {
    bathrooms,
    bedrooms,
    buildSize,
    neighbourhood,
    parkingSlots,
    plotSize,
    price,
  }
}

module.exports = queryApartment
