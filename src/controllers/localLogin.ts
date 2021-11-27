import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import User, { UserDocument } from '../models/User'
import bcrypt from 'bcryptjs'

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser)
      return res.status(404).json({ message: 'User doesnt exist.' })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials.' })

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({
      result: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        id: existingUser._id,
        order: existingUser.order,
        isAdmin: existingUser.isAdmin,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser)
      return res.status(400).json({ message: 'User already exists.' })

    if (password !== repeatPassword)
      return res.status(400).json({ message: 'Passwords do not match.' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign(
      { email: result.email, id: result._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(201).json({
      result: {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        id: result._id,
        order: result.order,
        isAdmin: result.isAdmin,
      },
      token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
