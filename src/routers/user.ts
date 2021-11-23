import express from 'express'

import {
  createUser,
  createLocalUser,
  findUserById,
  deleteUser,
  findAllUsers,
  updateUser,
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUsers)
router.get('/:userId', findUserById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.post('/googleSignUp', createUser)
router.post('/localAuth', createLocalUser)

export default router
