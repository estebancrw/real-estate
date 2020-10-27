const cleanPropertyUrls = (result) => {
  const { urls } = result
  const website = 'https://www.casasyterrenos.com'
  const filterString = '/propiedad'

  const filteredUrls = urls.filter((url) => url.startsWith(filterString))
  const cleanUrls = filteredUrls.map((url) => `${website}${url}`)

  return {
    ...result,
    urls: cleanUrls,
  }
}

module.exports = cleanPropertyUrls
