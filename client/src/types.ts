export interface Book {
  author: string[]
  description: string
  genres: string[]
  imageUrl: string
  name: string
  price: number
  __v: number
  _id: string
}

export interface ServerResponse {
  data: Book[]
}
