import { Book } from '../../types'

const defaultState = {
  isCartOpen: false,
  cart: [],
  userLoggedIn: false,
  userName: '',
  userEmail: '',
  userId: '',
  isAdmin: false,
}

interface DefaultState {
  isCartOpen: boolean
  cart: Book[]
  userLoggedIn: boolean
  userName: string
  userEmail: string
  userId: string
  isAdmin: boolean
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
        userLoggedIn: true,
        cart: action.payload,
      }
    case 'ADD_USER_DATA':
      return {
        ...state,
        userName: action.payload[0],
        userEmail: action.payload[1],
        userId: action.payload[2],
        isAdmin: action.payload[3],
      }
    case 'LOG_OUT':
      return {
        ...state,
        userName: '',
        userEmail: '',
        userId: '',
        userLoggedIn: false,
        cart: [],
        isAdmin: false,
      }
    default: {
      return { ...state }
    }
  }
}

export default cartReducer
