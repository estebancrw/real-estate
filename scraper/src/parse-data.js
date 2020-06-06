const { path } = require('ramda')

// getStates :: data -> state[]
const getStates = path(['property', 'location', 'states'])

// getTypes :: data -> type[]
const getTypes = path(['property', 'types'])

// getUses :: data -> use[]
const getUses = path(['property', 'uses'])

// getWebsites :: data -> website[]
const getWebsites = path(['property', 'websites'])

// parseData :: data -> dataLists
const parseData = (data) => {
  const states = getStates(data)
  const types = getTypes(data)
  const uses = getUses(data)
  const websites = getWebsites(data)

  return {
    states,
    types,
    uses,
    websites,
  }
}

module.exports = {
  getStates,
  getTypes,
  getUses,
  getWebsites,
  parseData,
}
