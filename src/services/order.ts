import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'
import Book from '../models/Book'

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const findOrderById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const findAllOrders = async (): Promise<OrderDocument[]> => {
  return Order.find().populate({
    path: 'bookId',
    select: 'name author',
  })
}

const updateOrder = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  })

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const deleteOrder = async (orderId: string): Promise<OrderDocument | null> => {
  const foundOrder = Order.findByIdAndDelete(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

export default {
  createOrder,
  findOrderById,
  findAllOrders,
  updateOrder,
  deleteOrder,
}
