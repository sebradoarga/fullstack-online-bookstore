import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../helpers/apiError'
import { UserDocument } from '../models/User'

const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  let user
  if (req.body.data) {
    user = req.body.data.user
  } else {
    user = req.body.user
  }

  if (user.isAdmin) {
    next()
  } else {
    throw new ForbiddenError()
  }
}

export default adminCheck
