import express from 'express'

import {
  createProduct,
  findProductById,
  deleteProduct,
  findAllProducts,
  updateProduct,
} from '../controllers/product'

const router = express.Router()

router.get('/', findAllProducts)
router.get('/:productId', findProductById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)
router.post('/', createProduct)

export default router
