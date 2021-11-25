import express from 'express'
import passport from 'passport'

import {
  createBook,
  findBookById,
  deleteBook,
  findAllBooks,
  updateBook,
  findBookByTitle,
  populateBooks,
} from '../controllers/book'

import adminCheck from '../middlewares/adminCheck'

const router = express.Router()

router.get('/', findAllBooks)
router.get('/title/:title', findBookByTitle)
router.get('/bookid/:bookId', findBookById)
router.put('/:bookId', updateBook)
router.delete('/:bookId', adminCheck, deleteBook)
router.post('/', adminCheck, createBook)
router.post('/populate', adminCheck, populateBooks)

export default router
