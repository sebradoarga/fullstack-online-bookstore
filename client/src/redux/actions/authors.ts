import * as api from '../../api'

export const getAuthors = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchAuthors()

    dispatch({ type: 'FETCH_ALL_AUTHORS', payload: data })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const createAuthor =
  (author: any, user: any) => async (dispatch: any) => {
    try {
      const { data } = await api.createAuthor(author, user)
      dispatch({ type: 'CREATE_AUTHOR', payload: data })
    } catch (error: any) {
      console.log(error.message)
    }
  }
