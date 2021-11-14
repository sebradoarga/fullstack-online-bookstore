import { Book } from '../../types'

export const toggleCart = () => (dispatch: any) => {
  try {
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

export const removeBookFromCart = (book: Book) => async (dispatch: any) => {
  try {
    dispatch({ type: 'REMOVE_BOOK_FROM_CART', payload: book._id })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const logInUser = (order: Book[]) => async (dispatch: any) => {
  try {
    dispatch({ type: 'LOG_IN_USER', payload: order })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const addUserData =
  (userName: string, userImage: string, userEmail: string, userId: string) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: 'ADD_USER_DATA',
        payload: [userName, userImage, userEmail, userId],
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

export const logout = () => async (dispatch: any) => {
  try {
    dispatch({
      type: 'LOG_OUT',
    })
  } catch (error: any) {
    console.log(error.message)
  }
}
