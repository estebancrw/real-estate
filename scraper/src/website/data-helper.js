const { join, match, pipe } = require('ramda')

const matchNumbers = pipe(match(/[0-9]/g), join(''))

const parseDecimal = (numberString) => parseInt(numberString, 10)

const matchAndParseDecimal = pipe(matchNumbers, parseDecimal)

module.exports = {
  matchAndParseDecimal,
  matchNumbers,
  parseDecimal,
}
