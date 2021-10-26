import { Book } from '../../types'

const defaultState = {
  books: [],
}

interface DefaultState {
  books: Book[]
}

const booksReducer = (state: DefaultState = defaultState, action: any) => {
  switch (action.type) {
    case 'FETCH_ALL_BOOKS':
      return {
        ...state,
        books: action.payload,
      }
    case 'CREATE_BOOK':
      const newBook = action.payload
      const newBookTitle = newBook.title
      const existBook = state.books.find((book) => newBookTitle === book.title)

      if (existBook) {
        return state
      } else {
        return {
          ...state,
          books: [...state.books, newBook],
        }
      }
    default: {
      return { ...state }
    }
  }
}

export default booksReducer
