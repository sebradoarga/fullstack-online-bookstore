import * as api from '../../api'

export const getBooks = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchBooks()

    dispatch({ type: 'FETCH_ALL_BOOKS', payload: data })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const createBook = (book: any, user: any) => async (dispatch: any) => {
  try {
    const { data } = await api.createBook(book, user)
    dispatch({ type: 'CREATE_BOOK', payload: data })
  } catch (error: any) {
    console.log(error.message)
  }
}
