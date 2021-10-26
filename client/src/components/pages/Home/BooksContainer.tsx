import styled from 'styled-components'
import DisplayedBook from './DisplayedBook'
import { Book } from '../../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'

const BooksContainer = () => {
  const books: Book[] = useSelector(
    (state: RootState) => state.booksReducer.books
  )

  console.log('books', books)

  return (
    <Container>
      {books.map((book: Book) => (
        <DisplayedBook key={book._id} book={book} />
      ))}
    </Container>
  )
}

export default BooksContainer

const Container = styled.div`
  width: 98%;
  margin: auto;
  margin-top: 8rem;
  padding: 2rem;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`
