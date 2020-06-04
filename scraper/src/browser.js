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

  // closePage :: page -> Promise<void>
  const closePage = async (page) => {
    log.debug('browser: close page')
    await page.close()
  }

  // getPage :: string -> Promise<link>
  const getPage = async (link) => {
    log.debug('browser: new page', link)
    await launch()

    const page = await lazyBrowser.newPage()

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
