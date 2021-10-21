import { combineReducers } from 'redux'
import booksReducer from './books'

const rootReducer = combineReducers({
  booksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
