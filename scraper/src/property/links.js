const { dissoc } = require('ramda')
const Link = require('./link')

function Links(params) {
  const { links } = params

  const withoutLinks = dissoc('links')

  const paramsWithoutLinks = withoutLinks(params)

  return links.map((link) =>
    Link({
      ...paramsWithoutLinks,
      link,
    }),
  )
}

module.exports = Links
