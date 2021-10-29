import express from 'express'

import {
  createAuthor,
  findAllAuthors,
  findAuthorByName,
  findAuthorById,
  updateAuthor,
  populateAuthors,
} from '../controllers/author'

const router = express.Router()

router.post('/', createAuthor)
router.get('/', findAllAuthors)
router.get('/name/:authorName', findAuthorByName)
router.get('/id/:authorId', findAuthorById)
router.put('/:authorId', updateAuthor)
router.post('/populate', populateAuthors)

export default router
