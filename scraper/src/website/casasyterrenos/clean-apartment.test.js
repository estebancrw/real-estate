const cleanApartment = require('./clean-apartment')

test('cleans apartment from scraped result', () => {
  const result = {
    price: '$99,999',
  }
  const expectedResult = {
    price: 99999,
  }

  expect(cleanApartment(result)).toStrictEqual(expectedResult)
})
