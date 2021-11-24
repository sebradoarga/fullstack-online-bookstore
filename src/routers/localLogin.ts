import express from 'express'
import { signin, signup } from '../controllers/localLogin'

const router = express.Router()

router.post('/login', signin)

router.post('/signup', signup)

export default router
