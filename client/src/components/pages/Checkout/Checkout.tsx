import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Footer from '../../Footer'
import CheckoutNavbar from '../Navbars/CheckoutNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { Book, User } from '../../../types'
import { RootState } from '../../../redux/reducers'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Link } from 'react-router-dom'
import { removeBookFromCart } from '../../../redux/actions/cart'
import { findUserById, updateUser } from '../../../api'
import { device } from '../../../device'

const Checkout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const cartBooks: Book[] = useSelector(
    (state: RootState) => state.cartReducer.cart
  )
  const getCurrentTotal = () => {
    let totalPrice = 0
    cartBooks.map((book) => {
      totalPrice = totalPrice + book.price
    })
    return totalPrice.toFixed(2)
  }

  const userId: string = useSelector(
    (state: RootState) => state.cartReducer.userId
  )

  const [dbUser, setDbUser] = useState<User>({
    firstName: '',
    lastName: '',
    image: '',
    email: '',
    order: [],
  })

  const getUser = async () => {
    const response: any = await findUserById(userId)
    const data: User = await response.data
    setDbUser(data)
    console.log('user is now', data)
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const removeBook = (book: Book) => {
    dispatch(removeBookFromCart(book))

    const newOrder: string[] = dbUser.order.filter(
      (orderBook: string) => orderBook !== book._id
    )

    console.log('newOrder is now', newOrder)
    console.log('updating user')

    const update = async () => {
      await updateUser(userId, {
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        image: dbUser.image,
        email: dbUser.email,
        order: newOrder,
      })
      getUser()
    }

    update()
  }

  return (
    <Wrapper>
      <Content>
        <CheckoutNavbar />
        <Header>Shopping Cart</Header>
        <CartInsides>
          {cartBooks.map((book) => (
            <ItemWrapper key={book._id}>
              <Item>
                <Image src={book.imageUrl} />
                <BookInfo>
                  <Link to={`/book/${book.title}`}>
                    <Title>{book.title}</Title>
                  </Link>
                  <Author>
                    {book.author.map((author) => (
                      <OneAuthor key={author._id}>
                        {author.authorName}
                      </OneAuthor>
                    ))}
                  </Author>
                </BookInfo>
              </Item>
              <RightSide>
                <Prices>
                  <OldPrice>
                    ${(book.price + 0.2 * book.price).toFixed(2)}
                  </OldPrice>
                  <NewPrice>${book.price.toFixed(2)}</NewPrice>
                </Prices>
                <RemoveBtn onClick={() => removeBook(book)}>
                  <DeleteOutlineIcon fontSize="large" />
                </RemoveBtn>
              </RightSide>
            </ItemWrapper>
          ))}
        </CartInsides>
        <Total>
          <TotalText>Total:</TotalText>
          <TotalPrice>${getCurrentTotal()}</TotalPrice>
        </Total>
        <CheckoutBtn>Checkout</CheckoutBtn>
      </Content>
      <Footer />
    </Wrapper>
  )
}

export default Checkout

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.h1`
  margin-top: 15rem;
  margin-left: 5rem;
  font-size: 3rem;
  letter-spacing: 0.1rem;
`
const CartInsides = styled.div`
  margin-top: 3rem;
`

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  border-top: 1px solid #e1e1e3;
  padding-top: 3rem;
  flex-direction: column;

  @media ${device.mobileL} {
    flex-direction: row;
  }

  @media ${device.laptop} {
    margin: 2rem 10rem;
  }
`

const Item = styled.div`
  display: flex;
`

const Image = styled.img`
  max-width: 13rem;
  box-shadow: 0px 6px 12px rgb(0 0 0 / 30%);
  border-radius: 4px;
`

const BookInfo = styled.div`
  margin-left: 2rem;
`

const Title = styled.h2`
  text-transform: capitalize;
  font-size: 2.2rem;
`

const Author = styled.div`
  margin-top: 1rem;
`

const OneAuthor = styled.h3`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 300;
`

const Prices = styled.div`
  margin-right: 2rem;
`

const OldPrice = styled.p`
  font-family: arial;
  font-size: 1.8rem;
  color: #c50404;
  text-decoration: line-through;
`

const NewPrice = styled.p`
  font-family: arial;
  font-size: 1.8rem;
`

const RemoveBtn = styled.button`
  background: none;
  border: none;
  height: 2rem;
  cursor: pointer;
`

const RightSide = styled.div`
  display: flex;
  align-self: flex-end;

  @media ${device.mobileL} {
    align-self: flex-start;
  }
`
const Total = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: flex-end;
  margin-right: 5rem;

  @media ${device.laptop} {
    margin-right: 12rem;
  }
`

const TotalText = styled.h3`
  font-size: 1.9rem;
  font-weight: 300;
`

const TotalPrice = styled.p`
  font-size: 1.9rem;
  font-family: sans-serif;
  margin-top: 0.5rem;
  font-weight: bold;
  margin-left: 1rem;
`
const CheckoutBtn = styled.button`
  align-self: flex-end;
  margin-right: 4rem;
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  border-radius: 15px;
  border: none;
  font-size: 1.5rem;
  color: white;
  background: #b14623;
  cursor: pointer;
  letter-spacing: 0.1rem;

  @media ${device.laptop} {
    margin-right: 11rem;
  }
`
