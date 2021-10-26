import { combineReducers } from 'redux'
import booksReducer from './books'
import authorsReducer from './authors'

const rootReducer = combineReducers({
  booksReducer,
  authorsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
