import { Book } from '../../types'

const defaultState = {
  isCartOpen: false,
  cart: [],
  userLoggedIn: false,
  userName: '',
  userImage: '',
  userEmail: '',
}

interface DefaultState {
  isCartOpen: boolean
  cart: Book[]
  userLoggedIn: boolean
  userName: string
  userImage: string
  userEmail: string
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
    case 'ADD_USER_DATA':
      return {
        ...state,
        userName: action.payload[0],
        userImage: action.payload[1],
        userEmail: action.payload[2],
      }
    case 'LOG_OUT':
      return {
        ...state,
        userName: '',
        userImage: '',
        userEmail: '',
        userLoggedIn: false,
      }
    default: {
      return { ...state }
    }
  }
}

export default cartReducer
