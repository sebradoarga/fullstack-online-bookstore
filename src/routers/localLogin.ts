import express from 'express'
import { signin, signup } from '../controllers/localLogin'
import passport from 'passport'

const router = express.Router()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  signin
)

router.post(
  '/signup',
  passport.authenticate('local', { session: false }),
  signup
)

export default router
