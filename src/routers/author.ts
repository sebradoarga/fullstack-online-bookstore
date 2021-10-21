import express from 'express'

import { createAuthor } from '../controllers/author'

const router = express.Router()

router.post('/', createAuthor)

export default router
