import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { findAuthorByName, findBookById } from '../../../api'
import { useState, useEffect } from 'react'
import { Author, PopulatedAuthor } from '../../../types'
import { v4 as uuidv4 } from 'uuid'

const AuthorPage = () => {
  const { author } = useParams<{ author: string }>()
  const [currentAuthor, setCurrentAuthor] = useState<Author>({
    authorName: '',
    authorPicture: '',
    authorBio: '',
    authorBooks: [],
    __v: 0,
    _id: '',
  })
  const [currentPopulatedAuthor, setCurrentPopulatedAuthor] =
    useState<PopulatedAuthor>({
      authorName: '',
      authorPicture: '',
      authorBio: '',
      authorBooks: [],
      __v: 0,
      _id: '',
    })

  const getCurrentAuthor = async () => {
    const data = await findAuthorByName(author)
    setCurrentAuthor(data.data)
  }

  const getBooksByAuthor = async () => {
    const booksByAuthor: any = await Promise.all(
      currentAuthor.authorBooks.map(async (book) => findBookById(book))
    )
    setCurrentPopulatedAuthor({
      authorName: currentAuthor.authorName,
      authorPicture: currentAuthor.authorPicture,
      authorBio: currentAuthor.authorBio,
      authorBooks: booksByAuthor,
      __v: currentAuthor.__v,
      _id: currentAuthor._id,
    })
  }

  useEffect(() => {
    getCurrentAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentAuthor.authorName !== '') {
      getBooksByAuthor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAuthor.authorName])

  const imageStyling = {
    maxWidth: '20rem',
    alignSelf: 'center',
  }

  return (
    <Container>
      <Link to="/">
        <ReturnBtn>Go back</ReturnBtn>
      </Link>
      <img src={currentAuthor.authorPicture} alt="" style={imageStyling} />
      <h1>{author}</h1>
      <p>{currentAuthor.authorBio}</p>
      <h2>Books</h2>
      <BooksContainer>
        {currentPopulatedAuthor.authorBooks.length > 0 &&
          currentPopulatedAuthor.authorBooks.map((book: any) => (
            <Link key={uuidv4()} to={`/book/${book.data.title}`}>
              <img src={book.data.imageUrl} alt="" />
            </Link>
          ))}
      </BooksContainer>
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

const ReturnBtn = styled.p`
  font-size: 1.8rem;
`
const BooksContainer = styled.div`
  display: flex;

  & img {
    width: 15rem;
    margin: 0.5rem;
  }
`
