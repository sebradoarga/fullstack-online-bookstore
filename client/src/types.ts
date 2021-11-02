import { StringMappingType } from 'typescript'

export interface Book {
  author: Author[]
  description: string
  genres: string[]
  imageUrl: string
  title: string
  price: number
  __v: number
  _id: string
}

export interface ServerResponse {
  data: Book[]
}

export interface Author {
  authorName: string
  authorPicture: string
  authorBio: string
  authorBooks: string[]
  __v: number
  _id: string
}

export interface PopulatedAuthor {
  authorName: string
  authorPicture: string
  authorBio: string
  authorBooks: Book[]
  __v: number
  _id: string
}

export interface User {
  firstName: string
  lastName: string
  image: string
  email: string
  order: string[]
}
