const database = require('../database')
const log = require('../logger')

function PropertyRepository() {
  const propertyCollection = database.collection('properties')

  // add :: property -> Promise<void>
  const add = async (property) => {
    log.debug('property-repository: add', property)
    const { id } = property

    await propertyCollection.doc(id).set(property)
  }

  // addAll :: property[] -> Promise<void>
  const addAll = async (properties) => {
    const writeBatch = database.batch()

    properties.forEach((property) => {
      const { id } = property
      const doc = propertyCollection.doc(id)

      writeBatch.set(doc, property)
    })

    await writeBatch.commit()
  }

  // remove :: property -> Promise<void>
  const remove = async (property) => {
    log.debug('property-repository: remove', property)
    const { id } = property

    await propertyCollection.doc(id).delete()
  }

  return {
    add,
    addAll,
    remove,
  }
}

module.exports = PropertyRepository()

// implement batchWrite
