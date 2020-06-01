const bunyan = require('bunyan')

const level = process.env.LOG_LEVEL || 'info'
const name = process.env.npm_package_name

const log = bunyan.createLogger({
  level,
  name,
})

module.exports = log
