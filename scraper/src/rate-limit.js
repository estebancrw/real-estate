const pLimit = require('p-limit')

function RateLimit() {
  const maxConcurrent = 3
  const rateLimit = pLimit(maxConcurrent)

  // withRateLimit :: fn -> args -> fn(args)
  const withRateLimit = (fn) => (...args) => rateLimit(() => fn(...args))

  return {
    rateLimit,
    withRateLimit,
  }
}

module.exports = RateLimit()
