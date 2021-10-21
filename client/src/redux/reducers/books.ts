import { Book } from '../../types'

const defaultState = {
  books: [],
}

interface DefaultState {
  books: Book[]
}

const booksReducer = (state: DefaultState = defaultState, action: any) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return {
        ...state,
        books: action.payload,
      }
    case 'CREATE':
      return { ...state }
    default: {
      return { ...state }
    }
  }
}

export default booksReducer
