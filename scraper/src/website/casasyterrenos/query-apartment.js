/* eslint-env browser */

const queryApartment = () => {
  const selectorPrice = '.primaryprice'

  const priceElement = document.querySelector(selectorPrice)
  const price = priceElement.textContent

  return {
    price,
  }
}

module.exports = queryApartment
