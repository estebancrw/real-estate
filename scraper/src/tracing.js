const beeline = require('honeycomb-beeline')({
  writeKey: process.env.HONEYCOMB_API_KEY,
  dataset: 'real-estate',
  serviceName: 'scraper',
})

function Tracing() {
  let trace = null

  const startTrace = (context = {}) => {
    trace = beeline.startTrace(context)
  }

  const finishTrace = () => {
    beeline.finishTrace(trace)
  }

  const startSpan = (context = {}) => beeline.startSpan(context)

  const finishSpan = (span) => beeline.finishSpan(span)

  return {
    finishSpan,
    finishTrace,
    startSpan,
    startTrace,
  }
}

module.exports = Tracing()
