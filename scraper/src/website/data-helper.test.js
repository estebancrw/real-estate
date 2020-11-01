const { matchAndParseDecimal, matchNumbers, parseDecimal } = require('./data-helper')

test('matches numbers in a string and parses to decimal', () => {
  const randomString = 'a1b2c3d4'
  const decimal = 1234

  expect(matchAndParseDecimal(randomString)).toBe(decimal)
})

test('matches numbers in a string', () => {
  const randomString = 'a1b2c3d4'
  const numberString = '1234'

  expect(matchNumbers(randomString)).toBe(numberString)
})

test('parses string of numbers to decimal', () => {
  const numberString = '1234'
  const decimal = 1234

  expect(parseDecimal(numberString)).toBe(decimal)
})
