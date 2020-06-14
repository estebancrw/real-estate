const { join, match, pipe, trim } = require('ramda')

function rules() {
  // elementTextContent :: element -> string
  const elementTextContent = (element) => element.textContent

  // mapElementHref :: element[] -> string[]
  const mapElementHref = (elements) => elements.map((element) => element.href)

  // matchNumbers :: string -> string
  const matchNumbers = pipe(match(/[0-9]/g), join(''))

  // nextElementTextContent :: element -> string
  const nextElementTextContent = (element) =>
    element.nextElementSibling.textContent

  // parentNextElementTextContent :: element -> string
  const parentNextElementTextContent = (element) =>
    element.parentElement.nextElementSibling.textContent

  // parseDecimal :: string -> number
  const parseDecimal = (numberString) => parseInt(numberString, 10)

  // matchAndParseNumbers :: string -> number
  const matchAndParseNumbers = pipe(matchNumbers, parseDecimal)

  const bathrooms = {
    clean: matchAndParseNumbers,
    name: 'bathrooms',
    pickFunction: nextElementTextContent,
    selector: 'div.Overview-attribute-wrapper > i.icon-bathrooms',
  }

  const bedrooms = {
    clean: matchAndParseNumbers,
    name: 'bedrooms',
    pickFunction: nextElementTextContent,
    selector: 'div.Overview-attribute-wrapper > i.icon-bedrooms',
  }

  const buildingSize = {
    clean: matchAndParseNumbers,
    name: 'buildingSize',
    pickFunction: nextElementTextContent,
    selector: 'div.Overview-attribute-wrapper > i.icon-livingsize',
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
    pickFunction: parentNextElementTextContent,
    selector: 'div.ellipsis > span.icon-empty',
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
