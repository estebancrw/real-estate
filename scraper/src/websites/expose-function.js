/* eslint-env browser */

const exposeFn = () => {
  const safePipe = (...fns) => (prop) => {
    return fns.reduce((value, fn) => {
      if (value === null) {
        return null
      }

      return fn(value)
    }, prop)
  }

  const map = (fn) => (list) => list.map(fn)

  window.controlFn = {
    safePipe,
    map,
  }

  const queryAllDocument = (selector) => () =>
    Array.from(document.querySelectorAll(selector))

  const queryDocument = (selector) => () => document.querySelector(selector)

  window.documentFn = {
    queryDocument,
    queryAllDocument,
  }

  const href = (element) => element.href

  const nextSiblingElement = (element) => element.nextElementSibling

  const parentElement = (element) => element.parentElement

  const queryElement = (selector) => (element) =>
    element.querySelector(selector)

  const textContent = (element) => element.textContent

  window.elementFn = {
    href,
    nextSiblingElement,
    parentElement,
    queryElement,
    textContent,
  }
}

module.exports = exposeFn
