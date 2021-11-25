import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import axios from 'axios'

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  console.log('$$CREATING USER')
  return user.save()
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findUserByEmail = async (userEmail: string): Promise<UserDocument> => {
  const foundUser = await User.findOne({ email: `${userEmail}` })

  if (!foundUser) {
    throw new NotFoundError(`User ${userEmail} not found`)
  }

  return foundUser
}

const findAllUsers = async (): Promise<UserDocument[]> => {
  return User.find()
}

const updateUser = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findOrCreate = async (
  userEmail: string,
  givenName: string,
  familyName: string
) => {
  console.log('~~~~~IM IN THE FIND OR CREATE SERVICE~~~~~~')
  const user = await User.findOne({ email: userEmail })
  console.log('USER IS', user)
  if (!user) {
    console.log('~~~~~~~USER WASNT FOUND~~~~~~')
    const findUser = async () => {
      const createdUser: any = await axios.post(
        'http://localhost:5000/api/v1/users/googleSignup',
        {
          firstName: givenName,
          lastName: familyName,
          email: userEmail,
        }
      )
      return createdUser
    }
    findUser()
  } else {
    console.log('user found')
    return user
  }
}

export default {
  createUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
  findOrCreate,
  findUserByEmail,
}
