import { useEffect } from 'react'
import { Author, Book } from '../../../types'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import HomeNavbar from '../Navbars/HomeNavbar'
import Footer from '../../Footer'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { addBookToCart } from '../../../redux/actions/cart'

const BookPage = () => {
  const dispatch = useDispatch()
  const { book } = useParams<{ book: string }>()
  const books: Book[] = useSelector(
    (state: RootState) => state.booksReducer.books
  )

  const currentBook = books.find((foundBook) => foundBook.title === book)
  console.log('books', books)
  console.log('book', currentBook)

  const linkInlineStyling = {
    textDecoration: 'none',
    color: 'black',
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const buyBook = () => {
    if (currentBook) {
      dispatch(addBookToCart(currentBook))
    }
  }

  return !currentBook ? (
    <div>Loading</div>
  ) : (
    <Wrapper>
      <PageContent>
        <HomeNavbar />
        <Container>
          <Image src={currentBook.imageUrl} alt="" />
          <BookInfo>
            <Title>{currentBook.title}</Title>
            {currentBook.author.map((author: Author) => (
              <Link
                to={`/author/${author.authorName}`}
                style={linkInlineStyling}
              >
                <AuthorName>{author.authorName}</AuthorName>
              </Link>
            ))}
            <Genres>
              {currentBook.genres.map((genre) => (
                <h3 key={uuidv4()}>{`${genre} `}</h3>
              ))}
            </Genres>
            <Description>
              {currentBook.description.split('\n').map((paragraph) => (
                <Paragraph key={uuidv4()}>{paragraph}</Paragraph>
              ))}
            </Description>
            <Price>${currentBook.price}</Price>
            <Buttons>
              <AddToCart onClick={buyBook}>
                <AddShoppingCartIcon
                  fontSize="large"
                  style={{ marginRight: '1rem' }}
                />
                Add to cart
              </AddToCart>
            </Buttons>
          </BookInfo>
        </Container>
      </PageContent>
      <Footer />
    </Wrapper>
  )
}

export default BookPage

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  padding-top: 15rem;
`

const Image = styled.img`
  width: 23rem;
  height: 35rem;
  box-shadow: rgb(0 0 0) 0px 0px 15px 1px;
`

const BookInfo = styled.div`
  margin-left: 3rem;
`

const Title = styled.h1`
  font-size: 4rem;
  text-transform: capitalize;
`

const AuthorName = styled.h2`
  color: #b14623;
  font-size: 1.7rem;
  letter-spacing: 0.3rem;
  margin-left: 0.3rem;
`
const Genres = styled.div`
  display: flex;
  margin-top: 1rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-left: 0.3rem;
  opacity: 0.7;
  letter-spacing: 0.15rem;

  & h3 {
    margin-right: 1rem;
  }
`

const Description = styled.div`
  font-size: 1.5rem;
`

const Price = styled.p`
  font-size: 2.7rem;
  font-weight: bold;
  margin-top: 2rem;
`

const Paragraph = styled.p`
  margin-top: 2rem;
`
const Buttons = styled.div`
  display: flex;
  margin-top: 2rem;
`

const AddToCart = styled.button`
  padding: 1rem;
  border-radius: 5px;
  border: none;
  background: #b14623;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`
const PageContent = styled.div``
