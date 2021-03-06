const puppeteer = require('puppeteer')
const { __, includes } = require('ramda')
const log = require('../logger')

function Browser() {
  let lazyBrowser = null
  const waitUntil = 'networkidle2'

  // isBrowserLaunched :: void -> boolean
  const isBrowserLaunched = () => lazyBrowser !== null

  // close :: void -> Promise<void>
  const close = async () => {
    if (isBrowserLaunched()) {
      log.debug('browser: close')
      await lazyBrowser.close()
    }
  }

  // launch :: void -> Promise<void>
  const launch = async () => {
    if (!isBrowserLaunched()) {
      log.debug('browser: launch')
      const params = {
        args: ['--disable-dev-shm-usage', '--disable-gpu', '--single-process'],
      }

      lazyBrowser = await puppeteer.launch(params)
    }
  }

  // closePage :: page -> Promise<void>
  const closePage = async (page) => {
    log.debug('browser: close page')
    await page.close()
  }

  // shouldSkip :: string -> boolean
  const shouldSkip = includes(__, ['font', 'image', 'stylesheet', 'script'])

  // getPage :: { string } -> Promise<page>
  const getPage = async ({ link }) => {
    log.debug('browser: new page', link)
    await launch()

    const page = await lazyBrowser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (request) => {
      const type = request.resourceType()

      if (shouldSkip(type)) {
        request.abort()
      } else {
        request.continue()
      }
    })

    // page.on('console', (msg) => console[msg._type]('PAGE LOG:', msg._text))

    const options = {
      waitUntil,
    }

    await page.goto(link, options)

    return page
  }

  return {
    close,
    closePage,
    getPage,
  }
}

module.exports = Browser()
