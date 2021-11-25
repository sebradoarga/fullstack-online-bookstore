import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../helpers/apiError'
import { UserDocument } from '../models/User'

const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  console.log('!!! IN THE ADMIN CHECK')
  console.log('USSSSEEEERRRR', req.body)

  let user
  if (req.body.data) {
    user = req.body.data.user
  } else {
    user = req.body.user
  }

  console.log('USSSSEEEERRRR', req.body.data)
  if (user.isAdmin) {
    next()
  } else {
    throw new ForbiddenError()
  }
}

export default adminCheck
