import express from 'express'

import {
  createBook,
  findBookById,
  deleteBook,
  findAllBooks,
  updateBook,
  findBookByTitle,
} from '../controllers/book'

const router = express.Router()

router.get('/', findAllBooks)
router.get('/title/:title', findBookByTitle)
router.get('/bookid/:bookId', findBookById)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
