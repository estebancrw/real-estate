const { PubSub } = require('@google-cloud/pubsub')
const log = require('../logger')

const topicName = process.env.PUBSUB_TOPIC

function Publisher() {
  const pubSubClient = new PubSub()

  const topic = pubSubClient.topic(topicName)

  // publish :: object -> Promise<void>
  const publish = async (data) => {
    log.debug('pubsub: data', data)
    const dataString = JSON.stringify(data)
    const dataBuffer = Buffer.from(dataString)

    try {
      const messageId = topic.publish(dataBuffer)
      log.debug('pubsub: messageId', messageId)
    } catch (error) {
      log.error('pubsub: error', error)
    }
  }

  // publishMultiple :: object[] -> Promise<void>
  const publishMultiple = (dataList) =>
    Promise.all(dataList.map((data) => publish(data)))

  return {
    publish,
    publishMultiple,
  }
}

module.exports = Publisher
