const lamudi = require('./lamudi')

function websiteFactory(name) {
  if (name === 'lamudi') {
    return lamudi
  }

  return null
}

module.exports = websiteFactory
