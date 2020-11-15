const cleanPropertyUrls = (urls) => {
  const website = 'https://www.casasyterrenos.com'
  const filterString = '/propiedad'

  const filteredUrls = urls.filter((url) => url.startsWith(filterString))
  const cleanUrls = filteredUrls.map((url) => `${website}${url}`)

  return cleanUrls
}

module.exports = cleanPropertyUrls
