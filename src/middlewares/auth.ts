import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JWT_SECRET } from '../util/secrets'

const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(' ')[1]
    const isCustomAuth = token.length < 500

    let decodedData: any

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, JWT_SECRET)

      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
