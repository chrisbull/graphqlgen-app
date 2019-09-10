import { MutationResolvers } from '../generated/graphqlgen'
import { Order, Sku, LineItem } from '../types'

export const Mutation: MutationResolvers.Type = {
  createUser: (_parent, { name }, ctx) => {
    const id = ctx.data.idProvider()
    const newUser = { id, name, postIDs: [], orderIDs: [] }
    ctx.data.users.push(newUser)
    return newUser
  },

  createProduct: (_parent, { code }, ctx) => {
    const id = ctx.data.idProvider()
    const newProduct = { id, code }
    ctx.data.products.push(newProduct)
    return newProduct
  },

  createBatch: (_parent, { code }, ctx) => {
    const id = ctx.data.idProvider()
    const newBatch = { id, code }
    ctx.data.batches.push(newBatch)
    return newBatch
  },

  createSku: (_parent, { productID, batchID }, ctx) => {
    const id = ctx.data.idProvider()

    if (!productID) {
      throw new Error(`No skuId was provided`)
    }

    const product = ctx.data.products.find((product) => product.id === productID)
    const batch = ctx.data.batches.find((batch) => batch.id === batchID)

    if (!product) {
      throw new Error(`No product was found for id: ${productID}`)
    }

    if (!batch) {
      throw new Error(`No batch was found for id: ${batchID}`)
    }

    const newSku: Sku = { id, product, batch }
    ctx.data.skus.push(newSku)
    return newSku
  },

  createLineItem: (_parent, { skuID }, ctx) => {
    const id = ctx.data.idProvider()
    const sku = ctx.data.skus.find((sku) => sku.id === skuID)

    if (!sku) {
      throw new Error(`No sku was found for id: ${skuID}`)
    }
    const newLineItem: LineItem = { id, sku }
    ctx.data.lineItems.push(newLineItem)
    return newLineItem
  },

  createOrder: (_parent, { lineItemIDs, userId }, ctx) => {
    const creator = ctx.data.users.find((user) => user.id === userId)

    if (!creator || creator === null) {
      throw new Error(`User with ID '${userId}' does not exist.`)
    }

    const lineItems = ctx.data.lineItems.filter((lineItem) => lineItemIDs.includes(lineItem.id))

    const orderCount = ctx.data.orders.length
    const id = ctx.data.idProvider()
    const number = orderCount + 1
    const newOrder: Order = { id, number, creator, lineItems }
    ctx.data.orders.push(newOrder)
    return newOrder
  },

  createDraft: (_parent, { title, content, authorId }, ctx) => {
    const author = ctx.data.users.find((user) => user.id === authorId)
    if (author === null) {
      throw new Error(`User with ID '${authorId}' does not exist.`)
    }
    const id = ctx.data.idProvider()
    const newDraft = { id, title, content, authorId, published: false }
    ctx.data.posts.push(newDraft)
    author!.postIDs.push(id)
    return newDraft
  },

  deletePost: (_parent, { id }, ctx) => {
    const postIndex = ctx.data.posts.findIndex((post) => post.id === id)
    if (postIndex < 0) {
      throw new Error(`Post with ID '${id}' does not exist.`)
    }
    const deleted = ctx.data.posts.splice(postIndex, 1)
    return deleted[0]
  },

  publish: (_parent, { id }, ctx) => {
    const post = ctx.data.posts.find((post) => post.id === id)
    post!.published = true
    return post!
  },
}
