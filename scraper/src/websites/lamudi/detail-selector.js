const { join } = require('ramda')

const detailsTable = '#listing-details > div'
const detailValue = 'div.last'

// nestInElement :: string[] -> string
const nestInElement = join('>')

// nthDiv :: number -> string
const nthDiv = (divNumber) => `div:nth-child(${divNumber})`

// detailSelector :: (number, number) -> string
const detailSelector = (column, row) =>
  nestInElement([detailsTable, nthDiv(column), nthDiv(row), detailValue])

// detailSelectorByValue :: string -> string
const detailSelectorByValue = (value) => {
  if (value === 'bathrooms') {
    return detailSelector(1, 3)
  }
  if (value === 'bedrooms') {
    return detailSelector(1, 2)
  }
  if (value === 'buildingSize') {
    return detailSelector(2, 1)
  }
  if (value === 'parking') {
    return detailSelector(1, 1)
  }

  return null
}

module.exports = {
  nestInElement,
  nthDiv,
  detailSelector,
  detailSelectorByValue,
}
