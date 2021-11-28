import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../../../images/logo-transparent-background.png'
import { device } from '../../../device'

const LoginNavbar = () => {
  const logoStyling = {
    width: '30rem',
  }

  return (
    <Navbar>
      <Link to="/">
        <Logo src={logo} alt="The Story Store logo" style={logoStyling} />
      </Link>
    </Navbar>
  )
}

export default LoginNavbar

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
const Logo = styled.img`
  height: 9.5rem;
  object-fit: contain;
  max-width: 65%;

  @media ${device.tablet} {
    max-width: 100%;
`
