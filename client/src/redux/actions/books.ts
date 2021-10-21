import * as api from '../../api'

export const getBooks = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchBooks()

    dispatch({ type: 'FETCH_ALL', payload: data })
  } catch (error) {
    console.log('error')
  }
}
