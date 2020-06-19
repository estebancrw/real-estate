const { basename } = require('path')
const { pick } = require('ramda')
const Listing = require('./listing')

function Link(params) {
  const keys = ['link']
  const extensionName = '.html'

  // getId :: link -> string
  const getId = ({ link }) => basename(link, extensionName)

  // pickLink :: params -> { link }
  const pickLink = pick(keys)

  const link = pickLink(params)
  const listing = Listing(params)

  const id = getId(link)

  return {
    id,
    ...link,
    ...listing,
  }
}

module.exports = Link
