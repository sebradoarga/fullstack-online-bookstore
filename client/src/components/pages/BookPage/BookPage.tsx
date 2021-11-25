import { useState, useEffect } from 'react'
import { Author, Book, User } from '../../../types'
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
import { findUserById, updateUser } from '../../../api'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteBookPopup from './DeleteBookPopup'
import LoadingPage from '../../LoadingPage'
import BookNotFoundPage from '../../BookNotFoundPage'
import { device } from '../../../device'

const BookPage = () => {
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const isCartOpen: boolean = useSelector(
    (state: RootState) => state.cartReducer.isCartOpen
  )

  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.cartReducer.userLoggedIn
  )

  const userId: string = useSelector(
    (state: RootState) => state.cartReducer.userId
  )

  const [dbUser, setDbUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    order: [],
  })

  const getUser = async () => {
    const response: any = await findUserById(userId)
    const data: User = await response.data
    setDbUser(data)
  }

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buyBook = () => {
    if (currentBook) {
      if (isBookInCart) {
        console.log('book already in cart')
      } else {
        dispatch(addBookToCart(currentBook))

        updateUser(userId, {
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          email: dbUser.email,
          order: [...dbUser.order, currentBook._id],
        })
      }
    }
  }

  const disabledButton = {
    background: '#b1462396',
    cursor: 'default',
  }

  const openModal = () => {
    modalOpen === false && setModalOpen(true)
  }

  const userEmail: string = useSelector(
    (state: RootState) => state.cartReducer.userEmail
  )

  return !currentBook || currentBook.title !== book ? (
    currentBook === undefined ? (
      <BookNotFoundPage />
    ) : (
      <LoadingPage />
    )
  ) : (
    <Wrapper>
      <PageContent>
        <CartSidebar />
        <HomeNavbar />
        <Container>
          <DeleteBookPopup
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            bookTitle={currentBook.title}
            bookId={currentBook._id}
            authors={currentBook.author}
            dbUser={dbUser}
          />
          <Image
            src={currentBook.imageUrl}
            alt={`Book cover for ${currentBook.title}`}
          />
          <BookInfo>
            {userEmail === 'raduoarga95@gmail.com' && (
              <DeleteBtn onClick={openModal}>
                <DeleteForeverIcon sx={{ color: 'red', fontSize: 30 }} />
                <HoverText>Permanently delete book</HoverText>
              </DeleteBtn>
            )}
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
              {isLoggedIn ? (
                isBookInCart ? (
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
                )
              ) : (
                <AddToCart style={disabledButton}>Please log in</AddToCart>
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
  flex-direction: column;
  align-items: center;
  padding-top: 15rem;
  position: relative;

  @media ${device.laptop} {
    flex-direction: row;
    align-items: flex-start;
  }
`

const Image = styled.img`
  width: 23rem;
  height: 35rem;
  box-shadow: rgb(0 0 0) 0px 0px 15px 1px;
  border-radius: 4px;
`

const BookInfo = styled.div`
  margin-top: 3rem;
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.laptop} {
    margin-top: 0;
  }
`

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-right: 1rem;
  position: relative;
  display: none;

  &:hover span {
    visibility: visible;
  }

  @media ${device.laptop} {
    display: block;
  }
`

const HoverText = styled.span`
  visibility: hidden;
  width: 18rem;
  background-color: #000000ba;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -9rem;
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
  text-transform: capitalize;
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
  text-align: center;
  max-width: 25rem;
  flex-wrap: wrap;

  & h3 {
    margin-right: 1rem;
  }

  @media ${device.laptop} {
    max-width: 60rem;
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
