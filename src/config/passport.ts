import { JWT_SECRET } from '../util/secrets'
import passport from 'passport'
import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/user'

import { Request, Response, NextFunction } from 'express'
import { UserDocument } from '../models/User'

// const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    console.log('!!!!!!!!in the strategy')
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { email, name, picture, given_name, family_name } =
      parsedToken.payload
    // const user = { email: 'raduoarga95@gmail.com', name: 'Radu Oarga' }
    const user = await UserService.findOrCreate(
      email,
      picture,
      given_name,
      family_name
    )

    done(null, user)
  }
)

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: UserDocument, done: any) => {
    console.log('payload', payload)
    const { email } = payload
    const user = await UserService.findUserByEmail(email)

    if (!user) {
      // throw notfound error
    }

    done(null, user)
  }
)
