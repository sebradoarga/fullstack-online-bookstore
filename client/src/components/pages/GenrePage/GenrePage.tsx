import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../Footer'
import HomeNavbar from '../Navbars/HomeNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import { addBookToCart, toggleCart } from '../../../redux/actions/cart'
import CartSidebar from '../../CartSidebar'
import { Book } from '../../../types'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const GenrePage = () => {
  const { genre } = useParams<{ genre: string }>()

  const dispatch = useDispatch()

  const cart: Book[] = useSelector((state: RootState) => state.cartReducer.cart)

  const isCartOpen: boolean = useSelector(
    (state: RootState) => state.cartReducer.isCartOpen
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    if (isCartOpen) {
      dispatch(toggleCart())
    }
  }, [])

  const books: Book[] = useSelector(
    (state: RootState) => state.booksReducer.books
  )

  const filteredBooks = books.filter((book) => {
    if (book.genres.includes(genre)) {
      return true
    }
  })

  const disabledButton = {
    background: '#b1462396',
    cursor: 'default',
  }

  const buyBook = (book: Book) => {
    if (cart.includes(book)) {
      console.log('book already in cart')
    } else {
      dispatch(addBookToCart(book))
    }
  }

  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.cartReducer.userLoggedIn
  )

  return (
    <div>
      <Wrapper>
        <PageContent>
          <CartSidebar />
          <HomeNavbar />
          <Header>{genre}</Header>
          <Container>
            {filteredBooks.map((book: Book) => (
              <BookContainer key={book._id}>
                <Link to={`/book/${book.title}`}>
                  <Image
                    src={book.imageUrl}
                    alt={`Book cover for ${book.title}`}
                  />
                </Link>
                <Link to={`/book/${book.title}`}>
                  <Title>{book.title}</Title>
                </Link>
                <Author>
                  {book.author.map((oneAuthor) => (
                    <Link
                      key={oneAuthor._id}
                      to={`/author/${oneAuthor.authorName}`}
                    >
                      <AuthorName>{oneAuthor.authorName}</AuthorName>
                    </Link>
                  ))}
                </Author>
                <Price>
                  <OldPrice>
                    ${(book.price + 0.2 * book.price).toFixed(2)}
                  </OldPrice>
                  <NewPrice>${book.price.toFixed(2)}</NewPrice>
                </Price>
                <BuyButton>
                  {isLoggedIn ? (
                    cart.includes(book) ? (
                      <AddToCart style={disabledButton}>
                        <ShoppingBasketIcon
                          fontSize="large"
                          style={{ marginRight: '1rem' }}
                        />
                        In Cart
                      </AddToCart>
                    ) : (
                      <AddToCart onClick={() => buyBook(book)}>
                        <AddShoppingCartIcon
                          fontSize="large"
                          style={{ marginRight: '1rem' }}
                        />
                        Add To Cart
                      </AddToCart>
                    )
                  ) : (
                    <AddToCart style={disabledButton}>Please log in</AddToCart>
                  )}
                </BuyButton>
              </BookContainer>
            ))}
          </Container>
        </PageContent>
        <Footer />
      </Wrapper>
    </div>
  )
}

export default GenrePage

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`
const PageContent = styled.div``

const Header = styled.h1`
  margin-top: 15rem;
  font-size: 5rem;
  text-transform: uppercase;
  margin-left: 3rem;
`

const Container = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`
const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-right: 2rem;
  margin-bottom: 5rem;
  width: 20rem;
`

const Image = styled.img`
  width: 20rem;
  height: 30rem;
  object-fit: center;
  boxshadow: 0px 6px 12px rgb(0 0 0 / 30%);
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.025);
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
  text-align: center;
  &:hover {
    color: #f4922e;
  }
`

const Author = styled.div``

const AuthorName = styled.h3`
  font-size: 1.3rem;
  margin-top: 1rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    color: #f4922e;
  }
`

const Price = styled.p`
  font-weight: bold;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OldPrice = styled.span`
  font-family: sans-serif;
  font-size: 1.5rem;
  color: #c50404;
  text-decoration: line-through;
`

const NewPrice = styled.span`
  font-family: sans-serif;
  font-size: 2rem;
  margin-top: 0.5rem;
`

const BuyButton = styled.div`
  margin-top: 2rem;
`

const AddToCart = styled.button`
  padding: 1rem;
  border-radius: 5px;
  border: none;
  background: #b14623;
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`
