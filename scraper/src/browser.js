const puppeteer = require('puppeteer')
const log = require('./logger')

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
      lazyBrowser = await puppeteer.launch()
    }
  }

  // getPage :: string -> Promise<page>
  const getPage = async (webpage) => {
    log.debug('browser: new page', webpage)
    await launch()

    const page = await lazyBrowser.newPage()

    const options = {
      waitUntil,
    }
    await page.goto(webpage, options)

    return page
  }

  return {
    close,
    getPage,
  }
}

module.exports = Browser()
