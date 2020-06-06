function PropertyValues() {
  const price = 'price'
  const links = 'links'

  const apartment = [price]

  const house = [price]

  const land = [price]

  const listing = [links]

  return {
    apartment,
    house,
    land,
    listing,
  }
}

module.exports = PropertyValues()
