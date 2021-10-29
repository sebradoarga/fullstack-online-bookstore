import { combineReducers } from 'redux'
import booksReducer from './books'
import authorsReducer from './authors'
import cartReducer from './cart'

const rootReducer = combineReducers({
  booksReducer,
  authorsReducer,
  cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
