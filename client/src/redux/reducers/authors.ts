import { Author } from '../../types'

const defaultState = {
  authors: [],
}

interface DefaultState {
  authors: Author[]
}

const authorsReducer = (state: DefaultState = defaultState, action: any) => {
  switch (action.type) {
    case 'FETCH_ALL_AUTHORS':
      return {
        ...state,
        authors: action.payload,
      }
    case 'CREATE_AUTHOR':
      const newAuthor = action.payload
      const newAuthorName = newAuthor.authorName
      const existAuthor = state.authors.find(
        (author) => newAuthorName === author.authorName
      )

      if (existAuthor) {
        return state
      } else {
        return {
          ...state,
          authors: [...state.authors, newAuthor],
        }
      }

    default: {
      return { ...state }
    }
  }
}

export default authorsReducer
