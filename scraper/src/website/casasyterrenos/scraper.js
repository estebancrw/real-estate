const cleanApartment = require('./clean-apartment')
const cleanPropertyUrls = require('./clean-property-urls')
const queryApartment = require('./query-apartment')
const queryPropertyUrls = require('./query-property-urls')

function scraper() {
  const propertyUrls = async (webpage) => {
    const result = await webpage.evaluate(queryPropertyUrls)

    return cleanPropertyUrls(result)
  }

  const apartment = async (webpage) => {
    const result = await webpage.evaluate(queryApartment)

    return cleanApartment(result)
  }

  return {
    apartment,
    propertyUrls,
  }
}

module.exports = scraper()
