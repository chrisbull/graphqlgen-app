import { ProductResolvers } from '../generated/graphqlgen'

export const Product: ProductResolvers.Type = {
  ...ProductResolvers.defaultResolvers,
}
