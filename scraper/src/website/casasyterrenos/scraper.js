const cleanPropertyUrls = require('./clean-property-urls')
const queryPropertyUrls = require('./query-property-urls')

function scraper() {
  const propertyUrls = async (webpage) => {
    const result = await webpage.evaluate(queryPropertyUrls)

    return cleanPropertyUrls(result)
  }

  return {
    propertyUrls,
  }
}

module.exports = scraper()
