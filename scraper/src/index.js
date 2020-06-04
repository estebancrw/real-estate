const log = require('./logger')

const run = async () => {
}

run()
  .then(() => {
    log.info('run: completed execution')
  })
  .catch((error) => {
    log.error(error)
  })
