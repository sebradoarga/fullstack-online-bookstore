import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../helpers/apiError'
import { UserDocument } from '../models/User'

const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserDocument
  // const role = user.role
  // if (role === 'admin') {
  //   next()
  // } else {
  //   throw new ForbiddenError()
  // }
}

export default adminCheck
