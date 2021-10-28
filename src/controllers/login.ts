import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import { UserDocument } from '../models/User'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('hier bin ich')
    const userData = req.user as UserDocument
    console.log('this is the userData', userData)
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '2h' })
    console.log('this is the token', token)
    console.log('user', userData)
    res.json({ token: token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
