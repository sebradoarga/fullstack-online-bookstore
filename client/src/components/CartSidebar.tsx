import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/reducers'
import CloseIcon from '@mui/icons-material/Close'
import { removeBookFromCart, toggleCart } from '../redux/actions/cart'
import { Book } from '../types'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const CartSidebar = () => {
  const dispatch = useDispatch()
  const isCartOpen: boolean = useSelector(
    (state: RootState) => state.cartReducer.isCartOpen
  )
  const cartBooks: Book[] = useSelector(
    (state: RootState) => state.cartReducer.cart
  )

  const displayStyling = {
    display: 'block',
  }

  const hideStyling = {
    display: 'none',
  }

  const closeCart = () => {
    dispatch(toggleCart())
  }

  const linkInlineStyling = {
    textDecoration: 'none',
  }

  const removeBook = (book: Book) => {
    dispatch(removeBookFromCart(book))
  }

  const getCurrentTotal = () => {
    let totalPrice = 0
    cartBooks.map((book) => {
      totalPrice = totalPrice + book.price
    })
    return totalPrice.toFixed(2)
  }

  return (
    <Wrapper style={isCartOpen ? displayStyling : hideStyling}>
      <CartHeader>
        <CloseButton>
          <CloseIcon fontSize="large" onClick={closeCart} />
        </CloseButton>
        <HeaderText>Your cart</HeaderText>
      </CartHeader>
      <BooksContainer>
        {cartBooks.length > 0 &&
          cartBooks.map((book) => (
            <BookWrapper key={uuidv4()}>
              <Link to={`/book/${book.title}`}>
                <Image src={book.imageUrl} alt="" />
              </Link>
              <BookInfo>
                <Link to={`/book/${book.title}`} style={linkInlineStyling}>
                  <Title>{book.title}</Title>
                </Link>
                <Price>${book.price.toFixed(2)}</Price>
                <RemoveBookBtn onClick={() => removeBook(book)}>
                  Remove
                </RemoveBookBtn>
              </BookInfo>
            </BookWrapper>
          ))}
      </BooksContainer>
      <CartFooter>
        <Total>
          <TotalText>Total:</TotalText>
          <TotalPrice>${getCurrentTotal()}</TotalPrice>
        </Total>
        {cartBooks.length > 0 && <CheckoutBtn>Go to Checkout</CheckoutBtn>}
      </CartFooter>
    </Wrapper>
  )
}

export default CartSidebar

const Wrapper = styled.div`
  width: 27rem;
  background: white;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  border-left: 7px solid #130912;
`
const CartHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  margin-left: 0.5rem;
`

const HeaderText = styled.h2`
  margin-left: 4rem;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  font-size: 1.8rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
`
const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  margin-top: 30%;
  overflow-y: auto;
  margin-right: 0.5rem;
  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #130912;
    border-radius: 10px;
  }
`

const BookWrapper = styled.div`
  display: flex;
  padding: 1rem;
`

const Image = styled.img`
  width: 6rem;
  object-fit: cover;
  box-shadow: 0px 6px 12px rgb(0 0 0 / 30%);
  border-radius: 4px;
`

const BookInfo = styled.div`
  margin-left: 1rem;
`

const Title = styled.h3`
  color: black;
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: capitalize;
`

const Price = styled.p`
  color: black;
  font-weight: bold;
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
  font-family: sans-serif;
  margin-top: 0.7rem;
`
const RemoveBookBtn = styled.button`
  margin-top: 2.5rem;
  background: none;
  border: none;
  border-bottom: 1px dotted black;
  padding-bottom: 0.2rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`
const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
`
const Total = styled.div`
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TotalText = styled.h3`
  font-size: 1.7rem;
  font-weight: 300;
`

const TotalPrice = styled.p`
  font-size: 1.7rem;
  font-family: sans-serif;
  margin-top: 0.5rem;
  font-weight: bold;
`

const CheckoutBtn = styled.button`
  margin-right: 1rem;
  padding: 0.8rem 1.5rem;
  background: #130912;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
`
