const { pick } = require('ramda')

function Location(params) {
  const keys = ['latitude', 'longitude']

  // pickLocation :: params -> location
  const pickLocation = pick(keys)

  return pickLocation(params)
}

module.exports = Location
