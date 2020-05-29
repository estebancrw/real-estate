const puppeteer = require('puppeteer')

function browser() {
  let lazyBrowser = null
  const waitUntil = 'networkidle2'

  // isBrowserLaunched :: void -> boolean
  const isBrowserLaunched = () => lazyBrowser !== null

  // close :: void -> Promise<void>
  const close = async () => {
    if (isBrowserLaunched()) {
      await lazyBrowser.close()
    }
  }

  // launch :: void -> Promise<void>
  const launch = async () => {
    if (!isBrowserLaunched()) {
      lazyBrowser = await puppeteer.launch()
    }
  }

  // getPage :: string -> Promise<page>
  const getPage = async (webpage) => {
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

module.exports = browser()
