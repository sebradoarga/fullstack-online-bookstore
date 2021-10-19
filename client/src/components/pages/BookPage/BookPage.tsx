import { Book } from '../../../types'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import uuid from 'uuid/v4'

const BookPage = ({ books }: { books: Book[] }) => {
  const book = useParams()
  console.log(book)

  const imageStyling = {
    maxWidth: '20rem',
    alignSelf: 'center',
  }

  return books.length < 1 ? (
    <div>Loading</div>
  ) : (
    <Container>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <img src={books[0].imageUrl} alt="" style={imageStyling} />
      <Title>{books[0].name}</Title>
      <Author>{books[0].author}</Author>
      <Genres>
        {books[0].genres.map((genre) => (
          <span key={uuid()}>{`${genre} `}</span>
        ))}
      </Genres>
      <Description>
        {books[0].description.split('\n').map((paragraph) => (
          <Paragraph>{paragraph}</Paragraph>
        ))}
      </Description>
      <Price>${books[0].price}</Price>
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
