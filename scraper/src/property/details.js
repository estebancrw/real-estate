const { pick } = require('ramda')

function Details(params) {
  const keys = [
    'bathrooms',
    'bedrooms',
    'buildingSize',
    'landSize',
    'parking',
    'size',
  ]

  // pickDetails :: params -> details
  const pickDetails = pick(keys)

  return pickDetails(params)
}

module.exports = Details
