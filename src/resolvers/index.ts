import { Resolvers } from '../generated/graphqlgen'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Post } from './Post'
import { User } from './User'
import { Order } from './Order'
import { LineItem } from './LineItem'
import { Sku } from './Sku'
import { Product } from './Product'
import { Batch } from './Batch'

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Post,
  User,
  Order,
  LineItem,
  Sku,
  Product,
  Batch,
}
