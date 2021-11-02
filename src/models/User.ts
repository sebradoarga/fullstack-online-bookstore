/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
export type UserDocument = Document & {
  firstName: string
  lastName: string
  image: string
  email: string
  order: string[]
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  order: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
