import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import Cors from 'cors'
import passport from 'passport'

import loginRouter from './routers/login'
import localLoginRouter from './routers/localLogin'
import userRouter from './routers/user'
import bookRouter from './routers/book'
import authorRouter from './routers/author'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'

import { googleStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(Cors())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(passport.initialize())
app.use(passport.session())

// passport strategies
passport.use(googleStrategy)
// passport.use(jwtStrategy)

app.use('/api/v1/google/login', loginRouter)

app.use('/api/v1/localLogin', localLoginRouter)

// Use users router
app.use('/api/v1/users', userRouter)

// Use books router
app.use('/api/v1/books', bookRouter)

//Use authors router
app.use('/api/v1/authors', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
