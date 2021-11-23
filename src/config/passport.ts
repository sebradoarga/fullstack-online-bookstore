import { JWT_SECRET } from '../util/secrets'
import passport from 'passport'
import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/user'
import { Request, Response, NextFunction } from 'express'
import User, { UserDocument } from '../models/User'
import bcrypt from 'bcryptjs'

const LocalStrategy = passportLocal.Strategy

export const localStrategy = new LocalStrategy(
  (email: string, password: string, done) => {
    User.findOne({ email: email }, (err: any, user: UserDocument) => {
      if (err) throw err
      if (!user) return done(null, false)
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err
        if (result === true) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
  }
)

passport.serializeUser((user: UserDocument, cb) => {
  cb(null, user._id)
})

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err, user: UserDocument) => {
    const userInformation: UserDocument = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    }
    cb(err, userInformation)
  })
})

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { email, name, picture, given_name, family_name } =
      parsedToken.payload
    const user = await UserService.findOrCreate(email, given_name, family_name)
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
