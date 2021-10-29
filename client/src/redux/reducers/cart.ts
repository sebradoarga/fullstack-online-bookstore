import { Book } from '../../types'

const defaultState = {
  isCartOpen: false,
  cart: [],
}

interface DefaultState {
  isCartOpen: boolean
  cart: Book[]
}

const cartReducer = (state: DefaultState = defaultState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_CART':
      const newState = state.isCartOpen === false ? true : false
      console.log('newState', newState)
      console.log('toggled')
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
    default: {
      return { ...state }
    }
  }
}

export default cartReducer
