const Listing = ({ state, city, type, use, website }) => ({
  location: {
    city,
    state,
  },
  type,
  use,
  website,
})

module.exports = Listing
