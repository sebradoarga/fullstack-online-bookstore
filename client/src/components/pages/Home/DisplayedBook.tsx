import styled from 'styled-components'
import { Book } from '../../../types'
import { Link } from 'react-router-dom'

const DisplayedBook = ({ book }: { book: Book }) => {
  const inlineStyle = {
    maxWidth: '18rem',
    maxHeight: '25rem',
    boxShadow: '0 0 15px 1px #000000',
  }

  return (
    <BookContainer>
      <Link to={`/book/${book.name}`}>
        <img src={book.imageUrl} alt="" style={inlineStyle} />
      </Link>
      <Link to={`/book/${book.name}`}>
        <Title>{book.name}</Title>
      </Link>
      <Author>{book.author}</Author>
      <Price>${book.price.toFixed(2)}</Price>
      {/*  */}
    </BookContainer>
  )
}

export default DisplayedBook

const BookContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 15%;
`
const Title = styled.h2`
  font-size: 2.2rem;
  margin-top: 1rem;
  text-align: center;
`
const Author = styled.h3`
  font-size: 1.8rem;
  font-weight: normal;
  margin-top: 0.5rem;
`
const Price = styled.p`
  font-size: 1.5rem;
  margin-top: 0.6rem;
`
