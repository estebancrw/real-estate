const lamudi = require('./lamudi')

function websiteFactory(website) {
  if (website === 'lamudi') {
    return lamudi
  }

  return null
}

module.exports = websiteFactory
