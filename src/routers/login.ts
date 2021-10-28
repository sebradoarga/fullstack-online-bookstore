import express from 'express'
import { login } from '../controllers/login'
import passport from 'passport'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  login
)

export default router
