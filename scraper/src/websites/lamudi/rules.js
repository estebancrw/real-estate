const { join, match } = require('ramda')

function rules() {
  const linksSelector = '.ListingCell-moreInfo-button-v2_redesign'
  const linksPickFunction = (elements) =>
    elements.map((element) => element.href)

  const priceSelector = '.FirstPrice'
  const pricePickFunction = (element) => element.textContent
  const priceClean = (value) => {
    const numbers = match(/[0-9]/g, value)
    const numberString = join('', numbers)

    return parseInt(numberString, 10)
  }

  return {
    links: {
      selector: linksSelector,
      pickFunction: linksPickFunction,
    },
    price: {
      selector: priceSelector,
      pickFunction: pricePickFunction,
      clean: priceClean,
    },
  }
}

module.exports = rules()
