import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/reducers'
import CloseIcon from '@mui/icons-material/Close'
import { toggleCart } from '../redux/actions/cart'
import { Book } from '../types'

const CartSidebar = () => {
  const dispatch = useDispatch()
  const isCartOpen: boolean = useSelector(
    (state: RootState) => state.cartReducer.isCartOpen
  )
  const cartBooks: Book[] = useSelector(
    (state: RootState) => state.cartReducer.cart
  )

  console.log('books in your cart', cartBooks)

  const displayStyling = {
    display: 'block',
  }

  const hideStyling = {
    display: 'none',
  }

  const closeCart = () => {
    dispatch(toggleCart())
  }

  return (
    <Wrapper style={isCartOpen ? displayStyling : hideStyling}>
      <CloseButton>
        <CloseIcon
          sx={{ color: 'white' }}
          fontSize="large"
          onClick={closeCart}
        />
      </CloseButton>
      <BooksContainer>
        {cartBooks.length > 0 &&
          cartBooks.map((book) => (
            <BookWrapper>
              <Image src={book.imageUrl} alt="" />
              <BookInfo>
                <Title>{book.title}</Title>
                <Price>${book.price}</Price>
              </BookInfo>
            </BookWrapper>
          ))}
      </BooksContainer>
    </Wrapper>
  )
}

export default CartSidebar

const Wrapper = styled.div`
  width: 25rem;
  background: white;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  background-image: url('halloween-pattern.png');
`
const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 2.5rem;
  right: 2rem;
  cursor: pointer;
`
const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 89%;
  margin-top: 30%;
  overflow-y: auto;
`

const BookWrapper = styled.div`
  display: flex;
  padding: 1rem;
  background: #ffffffc4;
`

const Image = styled.img`
  width: 8rem;
`

const BookInfo = styled.div`
  margin-left: 1rem;
  margin-top: 2.5rem;
`

const Title = styled.h3`
  color: black;
  font-weight: bold;
  font-size: 2rem;
  text-transform: capitalize;
`

const Price = styled.p`
  color: black;
  font-weight: bold;
  font-size: 2.5rem;
`
