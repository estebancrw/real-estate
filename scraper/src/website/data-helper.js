const { isNil, join, match, pipe } = require('ramda')

const matchNumbers = pipe(match(/[0-9]/g), join(''))

const parseDecimal = (numberString) => parseInt(numberString, 10)

const matchDecimal = pipe(matchNumbers, parseDecimal)

const safeCall = (fn, arg) => (isNil(arg) ? null : fn(arg))

module.exports = {
  matchDecimal,
  matchNumbers,
  parseDecimal,
  safeCall,
}
