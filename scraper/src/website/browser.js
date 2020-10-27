const puppeteer = require('puppeteer')
const { __, includes } = require('ramda')
const log = require('../logger')

function Browser() {
  let lazyBrowser = null

  // isBrowserLaunched :: void -> boolean
  const isBrowserLaunched = () => lazyBrowser !== null

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

  // close:: page -> Promise<void>
  const close = async (page) => {
    log.debug('browser: close page')
    await page.close()
  }

  // shouldSkip :: string -> boolean
  const shouldSkip = includes(__, ['font', 'image', 'stylesheet', 'script'])

  // open :: string -> Promise<page>
  const open = async (url) => {
    log.debug('browser: new page', url)
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

    page.on('console', (msg) => {
      if (msg._text.includes('net::ERR_FAILED')) {
        return
      }
      console.log(msg._text)
    })

    const options = {
      waitUntil: 'networkidle2',
    }

    await page.goto(url, options)

    return page
  }

  return {
    close,
    open,
  }
}

module.exports = Browser
