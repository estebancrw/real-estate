/**
 * @jest-environment jsdom
 */

/* eslint-env browser */

const queryPropertyUrls = require('./query-property-urls')

test('queries property urls from DOM', () => {
  document.body.innerHTML = `
  <div class="sidebar">
    <a href="/first/path"></a>
    <a href="/second/path"></a>
  </div>
  `
  const urls = ['/first/path', '/second/path']

  expect(queryPropertyUrls()).toStrictEqual(urls)
})
