import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { login } from '../../../api'
import logo from '../../../images/logo-transparent-background.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch } from 'react-redux'
import { toggleCart } from '../../../redux/actions/cart'

const HomeNavbar = () => {
  const dispatch = useDispatch()

  const responseGoogle = async (response: any) => {
    const tokenObj = {
      id_token: response.tokenId,
    }
    console.log('tokenObj', tokenObj)
    const result: any = await login(tokenObj)
    console.log('result', result)

    localStorage.setItem('token', result.data.token)
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
        <Link to="/addbook" style={linkInlineStyling}>
          Add book
        </Link>
        <CartButton onClick={cartClicked}>
          <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
        </CartButton>
        <GoogleLogin
          clientId="1082464560224-uhrnod2mojkoh61hag9tiua5qktdgekv.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
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
