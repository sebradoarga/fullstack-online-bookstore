import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { login } from '../../../api'
import logo from '../../../images/logo-transparent-background.png'

const HomeNavbar = () => {
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

  return (
    <Navbar>
      <Link to="/">
        <img src={logo} alt="" style={logoStyling} />
      </Link>
      <Buttons>
        <Link to="/addbook" style={linkInlineStyling}>
          Add book
        </Link>
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

const Navbar = styled.div`
  width: 100%;
  height: 10rem;
  background: #130912;
  display: flex;
  align-items: center;
  padding: 2rem;
  justify-content: space-between;
  position: fixed;
  overflow: hidden;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
`
