import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { login } from '../../../api'
import logo from '../../../images/logo-transparent-background.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, toggleCart } from '../../../redux/actions/cart'
import { logInUser } from '../../../redux/actions/cart'
import { RootState } from '../../../redux/reducers'

const HomeNavbar = () => {
  const dispatch = useDispatch()

  const userLoggedIn: boolean = useSelector(
    (state: RootState) => state.cartReducer.userLoggedIn
  )

  const userName: string = useSelector(
    (state: RootState) => state.cartReducer.userName
  )

  const userImage: string = useSelector(
    (state: RootState) => state.cartReducer.userImage
  )

  const responseGoogle = async (response: any) => {
    const tokenObj = {
      id_token: response.tokenId,
    }
    const result: any = await login(tokenObj)

    console.log('result', result)

    result &&
      dispatch(
        addUserData(
          `${result.data.userData.firstName} ${result.data.userData.lastName}`,
          result.data.userData.image
        )
      )
    result && localStorage.setItem('token', result.data.token)
    dispatch(logInUser())
  }

  const linkInlineStyling = {
    fontSize: '2rem',
    color: 'white',
    textDecoration: 'none',
    marginRight: '2.5rem',
  }

  const logoStyling = {
    width: '30rem',
  }

  const cartClicked = () => {
    dispatch(toggleCart())
  }

  return (
    <Navbar>
      <Link to="/">
        <img src={logo} alt="" style={logoStyling} />
      </Link>
      <Buttons>
        {/* <Link to="/addbook" style={linkInlineStyling}>
          Add book
        </Link> */}
        <CartButton onClick={cartClicked}>
          <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
        </CartButton>
        {userLoggedIn ? (
          <LoggedInUserPresentation>
            <Greeting>Hello, {userName}</Greeting>
            <Image src={userImage} />
          </LoggedInUserPresentation>
        ) : (
          <GoogleLogin
            clientId="1082464560224-uhrnod2mojkoh61hag9tiua5qktdgekv.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        )}
      </Buttons>
    </Navbar>
  )
}

export default HomeNavbar

const Navbar = styled.nav`
  width: 100%;
  height: 10rem;
  background: #130912;
  display: flex;
  align-items: center;
  padding: 2rem;
  justify-content: space-between;
  position: fixed;
  overflow: hidden;
  z-index: 9000;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
`

const CartButton = styled.button`
  background: none;
  border: none;
  margin-right: 2rem;
  cursor: pointer;
`
const LoggedInUserPresentation = styled.div`
  display: flex;
  align-items: center;
`

const Greeting = styled.p`
  color: white;
  margin-right: 2rem;
  font-size: 1.5rem;
`

const Image = styled.img`
  width: 5.5rem;
  border-radius: 50%;
  border: 2px solid white;
`
