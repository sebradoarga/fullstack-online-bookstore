import { Book } from '../../types'

export const toggleCart = () => (dispatch: any) => {
  try {
    console.log('in actions')
    dispatch({ type: 'TOGGLE_CART' })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const addBookToCart = (book: Book) => async (dispatch: any) => {
  try {
    dispatch({ type: 'ADD_BOOK_TO_CART', payload: book })
  } catch (error: any) {
    console.log(error.message)
  }
}
