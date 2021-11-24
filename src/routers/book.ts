import express from 'express'
import passport from 'passport'
import auth from '../middlewares/auth'

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
router.delete('/:bookId', auth, adminCheck, deleteBook)
router.post('/', auth, adminCheck, createBook)
router.post('/', createBook)
router.post('/populate', populateBooks)

export default router
