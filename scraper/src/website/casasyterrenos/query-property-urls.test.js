/**
 * @jest-environment jsdom
 */

/* eslint-env browser */

const queryPropertyUrls = require('./query-property-urls')

test('builds casasyterrenos object with all properties', () => {
  document.body.innerHTML = `
  <div class="sidebar">
    <a href="/first/path"></a>
    <a href="/second/path"></a>
  </div>
  `
  const urls = {
    urls: ['/first/path', '/second/path'],
  }

  expect(queryPropertyUrls()).toStrictEqual(urls)
})
