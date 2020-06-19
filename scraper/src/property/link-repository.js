const database = require('../database')
const log = require('../logger')

function LinkRepository() {
  const linkCollection = database.collection('links')

  // add :: link -> Promise<void>
  const add = async (link) => {
    log.debug('link-repository: add', link)
    const { id } = link

    await linkCollection.doc(id).set(link)
  }

  // addAll :: link[] -> Promise<void>
  const addAll = async (links) => {
    const writeBatch = database.batch()

    links.forEach((link) => {
      const { id } = link
      const doc = linkCollection.doc(id)

      writeBatch.set(doc, link)
    })

    await writeBatch.commit()
  }

  // isEmpty :: snapshot -> boolean
  const isEmpty = (snapshot) => snapshot.exists

  // exists :: link -> Promise<boolean>
  const exists = async (link) => {
    log.debug('link-repository: exists', link)
    const { id } = link

    const snapshot = await linkCollection.doc(id).get()

    return isEmpty(snapshot)
  }

  // filterNonVisited :: link[] -> link[]
  const filterNonVisited = async (links) => {
    const nonVisitedLinksWithNulls = await Promise.all(
      links.map(async (link) => {
        const doesExist = await exists(link)

        return doesExist ? null : link
      }),
    )
    const nonVisitedLinks = nonVisitedLinksWithNulls.filter(
      (link) => link !== null,
    )

    return nonVisitedLinks
  }

  // get :: string -> Promise<link>
  const get = (id) => {
    log.debug('link-repository: get', id)
    return linkCollection.doc(id).get()
  }

  // remove :: link -> Promise<void>
  const remove = async (link) => {
    log.debug('link-repository: remove', link)
    const { id } = link

    await linkCollection.doc(id).delete()
  }

  return {
    add,
    addAll,
    exists,
    filterNonVisited,
    get,
    isEmpty,
    remove,
  }
}

module.exports = LinkRepository()
