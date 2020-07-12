const lamudi = require('./lamudi')
const exposeFn = require('./expose-function')

function websiteFactory(name) {
  if (name === 'lamudi') {
    return {
      exposeFn,
      ...lamudi,
    }
  }

  return null
}

module.exports = websiteFactory
