import { Book } from '../../types'

const defaultState = {
  isCartOpen: false,
  cart: [],
  userLoggedIn: false,
}

interface DefaultState {
  isCartOpen: boolean
  cart: Book[]
  userLoggedIn: boolean
}

const cartReducer = (state: DefaultState = defaultState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_CART':
      const newState = state.isCartOpen === false ? true : false
      return {
        ...state,
        isCartOpen: newState,
      }
    case 'ADD_BOOK_TO_CART':
      const newBook = action.payload
      return {
        ...state,
        cart: [...state.cart, newBook],
      }
    case 'REMOVE_BOOK_FROM_CART':
      const afterState = state.cart.filter(
        (book) => book._id !== action.payload
      )
      return {
        ...state,
        cart: afterState,
      }
    case 'LOG_IN_USER':
      return {
        ...state,
        userLoggedIn: !state.userLoggedIn,
      }
    default: {
      return { ...state }
    }
  }
}

export default cartReducer
