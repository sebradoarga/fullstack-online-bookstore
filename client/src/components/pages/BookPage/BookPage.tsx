import { useEffect } from 'react'
import { Book } from '../../../types'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const BookPage = ({ books }: { books: Book[] }) => {
  const { book } = useParams<{ book: string }>()

  const currentBook = books.find((foundBook) => foundBook.name === book)
  console.log('books', books)
  console.log('book', currentBook)

  const imageStyling = {
    maxWidth: '20rem',
    alignSelf: 'center',
  }

  return !currentBook ? (
    <div>Loading</div>
  ) : (
    <Container>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <img src={currentBook.imageUrl} alt="" style={imageStyling} />
      <Title>{currentBook.name}</Title>
      <Author>{currentBook.author}</Author>
      <Genres>
        {currentBook.genres.map((genre) => (
          <span key={uuidv4()}>{`${genre} `}</span>
        ))}
      </Genres>
      <Description>
        {currentBook.description.split('\n').map((paragraph) => (
          <Paragraph key={uuidv4()}>{paragraph}</Paragraph>
        ))}
      </Description>
      <Price>${currentBook.price}</Price>
    </Container>
  )
}

export default BookPage

const Button = styled.p`
  font-size: 1.7rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`

const Title = styled.h1`
  margin-top: 2rem;
`

const Author = styled.h2`
  margin-top: 1rem;
`
const Genres = styled.h3``

const Description = styled.div`
  font-size: 2rem;
`

const Price = styled.p``

const Paragraph = styled.p`
  margin-top: 2rem;
`
