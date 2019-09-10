export interface Context {
  data: Data
}

export interface User {
  id: string
  name: string | null
  postIDs: string[]
  orderIDs: string[]
}

export interface Post {
  id: string
  title: string
  content: string
  published: boolean
  authorId: string
}

export interface Product {
  id: string
  code: string
}

export interface Batch {
  id: string
  code: string
}

export interface Sku {
  id: string
  product: Product
  batch: Batch
}

export interface LineItem {
  id: string
  sku: Sku
}

export interface Order {
  id: string
  number: number
  creator: User
  lineItems: LineItem[]
}

export interface Data {
  posts: Post[]
  orders: Order[]
  users: User[]
  lineItems: LineItem[]
  batches: Batch[]
  skus: Sku[]
  products: Product[]

  idProvider: () => string
}
