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
    const userData = req.user as UserDocument
    const token = jwt.sign({ userData }, JWT_SECRET, { expiresIn: '2h' })
    // res.json({ token: token })
    res.json({ userData })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
