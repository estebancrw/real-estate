const decodeJson = (encoded) => {
  const decoded = Buffer.from(encoded, 'base64').toString()
  const parsed = JSON.parse(decoded)

  return parsed
}

module.exports = decodeJson
