const pLimit = require('p-limit')

const maxConcurrentPromises = 3

module.exports = pLimit(maxConcurrentPromises)
