import styled from 'styled-components'
import DisplayedBook from './DisplayedBook'
import { Book } from '../../../types'

const BooksContainer = ({ books }: { books: Book[] }) => {
  return (
    <Container>
      {books.slice(0, 5).map((book: Book) => (
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
  align-items: center;
  justify-content: space-between;
`
