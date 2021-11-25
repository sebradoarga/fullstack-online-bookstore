import { JWT_SECRET } from '../util/secrets'
import passport from 'passport'
import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/user'
import { Request, Response, NextFunction } from 'express'
import User, { UserDocument } from '../models/User'
import bcrypt from 'bcryptjs'

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    console.log('***IM IN THE GOOGLE STRATEGY***')
    const { email, given_name, family_name } = parsedToken.payload
    const user = await UserService.findOrCreate(email, given_name, family_name)
    done(null, user)
  }
)

// export const jwtStrategy = new JwtStrategy(
//   {
//     secretOrKey: JWT_SECRET,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   },
//   async (payload: UserDocument, done: any) => {
//     const { email } = payload
//     const user = await UserService.findUserByEmail(email)

//     if (!user) {
//       // throw notfound error
//     }

//     done(null, user)
//   }
// )
