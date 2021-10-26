import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  authorName: string
  authorPicture: string
  authorBio: string
  authorBooks: []
}

const authorSchema = new mongoose.Schema({
  authorName: {
    type: String,
    index: true,
    required: true,
  },
  authorPicture: {
    type: String,
    required: true,
  },
  authorBio: {
    type: String,
    required: true,
  },
  authorBooks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
