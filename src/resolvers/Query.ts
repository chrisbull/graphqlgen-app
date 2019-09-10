import { QueryResolvers } from '../generated/graphqlgen'

export const Query: QueryResolvers.Type = {
  feed: (_parent, _args, ctx) => {
    return ctx.data.posts.filter((post) => post.published)
  },

  drafts: (_parent, _args, ctx) => {
    return ctx.data.posts.filter((post) => !post.published)
  },

  orders: (_parent, _args, ctx) => {
    return ctx.data.orders.filter((order) => order)
  },

  post: (_parent, args, ctx) => {
    return ctx.data.posts.find((post) => post.id === args.id)!
  },

  order: (_parent, args, ctx) => {
    return ctx.data.orders.find((order) => order.id === args.id)!
  },
}
