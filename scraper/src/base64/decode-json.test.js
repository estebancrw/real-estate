const decodeJson = require('./decode-json')

test('decode base64 to json', () => {
  const encoded = 'eyJhIjoiYTEiLCJiIjoiYjIifQo='
  const decoded = {
    a: 'a1',
    b: 'b2',
  }

  expect(decodeJson(encoded)).toStrictEqual(decoded)
})
