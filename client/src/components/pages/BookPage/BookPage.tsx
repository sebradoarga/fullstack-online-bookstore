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
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { addBookToCart, toggleCart } from '../../../redux/actions/cart'
import CartSidebar from '../../CartSidebar'

const BookPage = () => {
  const dispatch = useDispatch()

  const isCartOpen: boolean = useSelector(
    (state: RootState) => state.cartReducer.isCartOpen
  )

  const { book } = useParams<{ book: string }>()
  const books: Book[] = useSelector(
    (state: RootState) => state.booksReducer.books
  )

  const cart: Book[] = useSelector((state: RootState) => state.cartReducer.cart)

  const currentBook = books.find((foundBook) => foundBook.title === book)

  const isBookInCart = currentBook ? cart.includes(currentBook) : false

  const linkInlineStyling = {
    textDecoration: 'none',
    color: 'black',
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    if (isCartOpen) {
      dispatch(toggleCart())
    }
  }, [])

  const buyBook = () => {
    if (currentBook) {
      if (isBookInCart) {
        console.log('book already in cart')
      } else {
        dispatch(addBookToCart(currentBook))
      }
    }
  }

  const disabledButton = {
    background: '#b1462396',
    cursor: 'default',
  }

  return !currentBook ? (
    <div>Loading</div>
  ) : (
    <Wrapper>
      <PageContent>
        <CartSidebar />
        <HomeNavbar />
        <Container>
          <Image src={currentBook.imageUrl} alt="" />
          <BookInfo>
            <Title>{currentBook.title}</Title>
            {currentBook.author.map((author: Author) => (
              <Link
                to={`/author/${author.authorName}`}
                style={linkInlineStyling}
                key={uuidv4()}
              >
                <AuthorName>{author.authorName}</AuthorName>
              </Link>
            ))}
            <Genres>
              {currentBook.genres.map((genre) => (
                <h3 key={uuidv4()}>
                  <Link to={`/genres/${genre}`}>{`${genre} `}</Link>
                </h3>
              ))}
            </Genres>
            <Description>
              {currentBook.description.split('\n').map((paragraph) => (
                <Paragraph key={uuidv4()}>{paragraph}</Paragraph>
              ))}
            </Description>
            <Price>
              <OldPrice>
                ${(currentBook.price + 0.2 * currentBook.price).toFixed(2)}
              </OldPrice>
              <NewPrice>${currentBook.price.toFixed(2)}</NewPrice>
            </Price>
            <Buttons>
              {isBookInCart ? (
                <AddToCart style={disabledButton}>
                  <ShoppingBasketIcon
                    fontSize="large"
                    style={{ marginRight: '1rem' }}
                  />
                  In Cart
                </AddToCart>
              ) : (
                <AddToCart onClick={buyBook}>
                  <AddShoppingCartIcon
                    fontSize="large"
                    style={{ marginRight: '1rem' }}
                  />
                  Add To Cart
                </AddToCart>
              )}
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
  border-radius: 4px;
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
  transition: all 0.3s ease;

  & h3 {
    margin-right: 1rem;
  }
`

const Description = styled.div`
  font-size: 1.5rem;
`

const Price = styled.p`
  font-weight: bold;
  margin-top: 2rem;
`

const OldPrice = styled.span`
  font-family: sans-serif;
  font-size: 2.2rem;
  color: #c50404;
  text-decoration: line-through;
`

const NewPrice = styled.span`
  font-family: sans-serif;
  margin-left: 1.5rem;
  font-size: 2.7rem;
`

const Paragraph = styled.p`
  margin-top: 2rem;
`
const Buttons = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
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
