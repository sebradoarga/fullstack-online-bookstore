import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { findAuthorByName, findBookById } from '../../../api'
import { useState, useEffect } from 'react'
import { Author } from '../../../types'

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

  const getCurrentAuthor = async () => {
    const data = await findAuthorByName(author)
    setCurrentAuthor(data.data)
  }

  const getBooksByAuthor = async () => {
    const booksByAuthor: any = await currentAuthor.authorBooks.map((book) =>
      findBookById(book)
    )
    setCurrentAuthor({ ...currentAuthor, authorBooks: booksByAuthor })
  }

  useEffect(() => {
    getCurrentAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getBooksByAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAuthor.authorName])

  useEffect(() => {
    console.log('final current author', currentAuthor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAuthor.authorBooks])

  console.log('currentAuthor', currentAuthor)

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
      <BooksContainer> </BooksContainer>
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
const BooksContainer = styled.div``
