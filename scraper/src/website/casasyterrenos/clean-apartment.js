const { matchAndParseDecimal } = require('../data-helper')

const cleanApartment = (result) => {
  const { price } = result

  const cleanPrice = matchAndParseDecimal(price)

  return {
    price: cleanPrice,
  }
}

module.exports = cleanApartment
