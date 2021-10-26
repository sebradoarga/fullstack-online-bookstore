/* eslint-disable @typescript-eslint/member-delimiter-style */
import { StringNullableChain } from 'lodash'
import mongoose, { Document } from 'mongoose'
import { AuthorDocument } from './Author'

export type BookDocument = Document & {
  title: string
  author: AuthorDocument[]
  genres: string[]
  description: string
  price: number
  imageUrl: string
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    index: true,
    // required: true,
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
