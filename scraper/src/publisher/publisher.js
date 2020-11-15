const { PubSub } = require('@google-cloud/pubsub')
const log = require('../logger')

const topicName = process.env.PUBSUB_TOPIC

function Publisher() {
  const pubSubClient = new PubSub()

  const topic = pubSubClient.topic(topicName)

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

  return {
    publish,
  }
}

module.exports = Publisher
