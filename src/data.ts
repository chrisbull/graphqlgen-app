import { Data, Order, LineItem, Batch, Sku, Product } from './types'

const users = [
  { id: '1', name: 'Alice', postIDs: ['3', '4'], orderIDs: [] },
  { id: '2', name: 'Bob', postIDs: [], orderIDs: [] },
]

const posts = [
  {
    id: '3',
    title: 'GraphQL Conf 2019',
    content: 'An awesome GraphQL conference in Berlin.',
    published: true,
    authorId: '1',
  },
  {
    id: '4',
    title: 'GraphQL Weekly',
    content: 'Weekly news about the Grap[hQL ecosystem and community.',
    published: false,
    authorId: '1',
  },
]

const orders: Order[] = []
const lineItems: LineItem[] = []
const batches: Batch[] = []
const skus: Sku[] = []
const products: Product[] = []

let idCount = 4
function idProvider(): string {
  return `${idCount++}`
}

export const data: Data = { posts, users, orders, lineItems, batches, skus, products, idProvider }
