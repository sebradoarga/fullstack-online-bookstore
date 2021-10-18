import dotenv from 'dotenv'
import { products } from './data/products'
import Product from './models/Product'

const importData = async () => {
  try {
    await Product.deleteMany()
    await Product.insertMany(productsData)
    console.log('Data import success')
    process.exit()
  } catch (error) {
    console.error('Error with data import')
    process.exit(1)
  }
}

importData()
