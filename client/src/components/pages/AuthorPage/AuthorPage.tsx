import styled from 'styled-components'
import { Book } from '../../../types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'

const AuthorPage = () => {
  const books: Book[] = useSelector(
    (state: RootState) => state.booksReducer.books
  )

  const imageStyling = {
    maxWidth: '20rem',
    alignSelf: 'center',
  }

  return (
    <Container>
      <Link to="/">
        <ReturnBtn>Go back</ReturnBtn>
      </Link>
      <img
        src="https://images.gr-assets.com/authors/1591638024p5/8349.jpg"
        alt=""
        style={imageStyling}
      />
      <h1>Christopher Paolini</h1>
      <p>
        Christopher Paolini was born in Southern California and has lived most
        of his life in Paradise Valley, Montana. He published his first novel,
        Eragon, in 2003 at the age of nineteen, and quickly became a publishing
        phenomenon. His Inheritance Cycle—Eragon and its three sequels—have sold
        nearly 40 million copies worldwide. To Sleep in a Sea of Stars is his
        first adult novel.
      </p>
      <h2>Books</h2>
      <img src={books[0].imageUrl} alt="" style={imageStyling} />
    </Container>
  )
}

export default AuthorPage

const Container = styled.div`
  width: 80%;
  margin: 10rem auto;
  display: flex;
  flex-direction: column;
`

const ReturnBtn = styled.a`
  font-size: 1.8rem;
`
