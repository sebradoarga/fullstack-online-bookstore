import { JWT_SECRET } from '../util/secrets'
import GoogleTokenStrategy from 'passport-google-id-token'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/user'
import { UserDocument } from '../models/User'

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { email, given_name, family_name } = parsedToken.payload
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
    const { email } = payload
    const user = await UserService.findUserByEmail(email)

    if (!user) {
      // throw notfound error
    }

    done(null, user)
  }
)
