/* eslint-disable @typescript-eslint/member-delimiter-style */
import { StringNullableChain } from 'lodash'
import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  name: string
  author: string[]
  genres: string[]
  description: string
  price: number
  imageUrl: string
}

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
  author: {
    type: Array,
    index: true,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
