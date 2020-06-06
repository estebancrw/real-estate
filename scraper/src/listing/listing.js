function Listing(params) {
  const { city, state, type, use, website } = params

  return {
    city,
    state,
    type,
    use,
    website,
  }
}

module.exports = Listing
