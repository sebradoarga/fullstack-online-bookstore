import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import Cors from 'cors'

import movieRouter from './routers/movie'
import userRouter from './routers/user'
import bookRouter from './routers/book'
import orderRouter from './routers/order'
import authorRouter from './routers/author'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(Cors())

// Use movie router
app.use('/api/v1/movies', movieRouter)

// Use users router
app.use('/api/v1/users', userRouter)

// Use books router
app.use('/api/v1/books', bookRouter)

//Use orders router
app.use('/api/v1/orders', orderRouter)

//Use authors router
app.use('/api/v1/authors', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
