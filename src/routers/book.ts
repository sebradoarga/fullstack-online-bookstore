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
router.delete('/:bookId', deleteBook)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminCheck,
  createBook
)
router.post('/populate', populateBooks)

export default router
