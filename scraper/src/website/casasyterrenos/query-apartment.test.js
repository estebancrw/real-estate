/**
 * @jest-environment jsdom
 */

/* eslint-env browser */

const queryApartment = require('./query-apartment')

test('queries apartment from DOM', () => {
  document.body.innerHTML = `
  <div class="primaryprice">$99,999</div>
  `
  const expectedResult = {
    price: '$99,999',
  }

  expect(queryApartment()).toStrictEqual(expectedResult)
})
