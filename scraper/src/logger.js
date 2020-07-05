const bunyan = require('bunyan')

const level = process.env.LOG_LEVEL || 'info'
const name = process.env.FUNCTION_TARGET || 'scraper'

const log = bunyan.createLogger({
  level,
  name,
})

module.exports = log
