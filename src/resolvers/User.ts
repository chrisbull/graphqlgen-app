import { UserResolvers } from '../generated/graphqlgen'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  posts: ({ postIDs }, args, ctx) => {
    return ctx.data.posts.filter((post) => postIDs.includes(post.id))
  },

  orders: ({ orderIDs }, args, ctx) => {
    return ctx.data.orders.filter((order) => orderIDs.includes(order.id))
  },
}
