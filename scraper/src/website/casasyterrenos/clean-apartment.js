const { matchDecimal, parseDecimal, safeCall } = require('../data-helper')

const cleanApartment = (result) => {
  const {
    bathrooms,
    bedrooms,
    buildSize,
    neighbourhood,
    parkingSlots,
    plotSize,
    price,
  } = result

  const cleanBathrooms = parseFloat(bathrooms)
  const cleanBedrooms = parseDecimal(bedrooms)
  const cleanBuildSize = parseDecimal(buildSize)
  const cleanParkingSlots = parseDecimal(parkingSlots)
  const cleanPlotSize = parseDecimal(plotSize)
  const cleanPrice = safeCall(matchDecimal, price)

  return {
    bathrooms: cleanBathrooms,
    bedrooms: cleanBedrooms,
    buildSize: cleanBuildSize,
    neighbourhood,
    parkingSlots: cleanParkingSlots,
    plotSize: cleanPlotSize,
    price: cleanPrice,
  }
}

module.exports = cleanApartment
