const puppeteer = require('puppeteer')
const { __, includes } = require('ramda')
const log = require('../logger')

function Browser() {
  let browser

  // open :: void -> Promise<browser>
  const open = async () => {
    log.debug('browser: open browser')

    const params = {
      args: ['--disable-dev-shm-usage', '--disable-gpu', '--single-process'],
    }
    browser = await puppeteer.launch(params)
  }

  // close :: void -> Promise<void>
  const close = async () => {
    log.debug('browser: close browser')
    await browser.close()
  }

  // closePage :: page -> Promise<void>
  const closePage = async (page) => {
    log.debug('browser: close page')
    await page.close()
  }

  // shouldSkip :: string -> boolean
  const shouldSkip = includes(__, ['font', 'image', 'stylesheet', 'script'])

  // openPage :: string -> Promise<page>
  const openPage = async (url) => {
    log.debug('browser: new page', url)
    const page = await browser.newPage()

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
      const text = msg.text()
      if (text.includes('net::ERR_FAILED')) {
        return
      }
      log.debug(text)
    })

    const options = {
      waitUntil: 'networkidle2',
    }

    await page.goto(url, options)

    return page
  }

  return {
    close,
    closePage,
    open,
    openPage,
  }
}

module.exports = Browser
