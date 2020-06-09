const { join, match, pipe, trim } = require('ramda')
const { detailSelectorByValue } = require('./detail-selector')

function rules() {
  // elementTextContent :: element -> string
  const elementTextContent = (element) => element.textContent

  // mapElementHref :: element[] -> string[]
  const mapElementHref = (elements) => elements.map((element) => element.href)

  // matchNumbers :: string -> string
  const matchNumbers = pipe(match(/[0-9]/g), join(''))

  // parseDecimal :: string -> number
  const parseDecimal = (numberString) => parseInt(numberString, 10)

  // matchAndParseNumbers :: string -> number
  const matchAndParseNumbers = pipe(matchNumbers, parseDecimal)

  const bathrooms = {
    clean: trim,
    name: 'bathrooms',
    pickFunction: elementTextContent,
    selector: detailSelectorByValue('bathrooms'),
  }

  const bedrooms = {
    clean: trim,
    name: 'bedrooms',
    pickFunction: elementTextContent,
    selector: detailSelectorByValue('bedrooms'),
  }

  const buildingSize = {
    clean: trim,
    name: 'buildingSize',
    pickFunction: elementTextContent,
    selector: detailSelectorByValue('buildingSize'),
  }

  const links = {
    multipleElements: true,
    name: 'links',
    pickFunction: mapElementHref,
    selector: '.ListingCell-moreInfo-button-v2_redesign',
  }

  const parking = {
    clean: trim,
    name: 'parking',
    pickFunction: elementTextContent,
    selector: detailSelectorByValue('parking'),
  }

  const price = {
    clean: matchAndParseNumbers,
    name: 'price',
    pickFunction: elementTextContent,
    selector: '.FirstPrice',
  }

  const listing = [links]

  const property = [bathrooms, bedrooms, buildingSize, parking, price]

  return {
    listing,
    property,
  }
}

module.exports = rules()
