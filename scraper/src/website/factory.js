const casasyterrenos = require('./casasyterrenos')

function Factory(listing) {
  const { website } = listing

  if (website === 'casasyterrenos') {
    return casasyterrenos
  }
}

module.exports = Factory
