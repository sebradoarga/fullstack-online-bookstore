import express from 'express'

import {
  createBook,
  findBookById,
  deleteBook,
  findAllBooks,
  updateBook,
} from '../controllers/book'

const router = express.Router()

router.get('/', findAllBooks)
router.get('/:bookId', findBookById)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
