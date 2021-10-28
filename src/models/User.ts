/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { OrderDocument } from './Order'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  image: string
  email: string
  address: string
  orders: OrderDocument[]
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
  address: {
    type: String,
    // required: true,
  },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
