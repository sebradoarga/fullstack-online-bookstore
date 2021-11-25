import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { login } from '../../../api'
import logo from '../../../images/logo-transparent-background.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'

const HomeNavbar = () => {
  const userLoggedIn: boolean = useSelector(
    (state: RootState) => state.cartReducer.userLoggedIn
  )

  const userName: string = useSelector(
    (state: RootState) => state.cartReducer.userName
  )

  const logoStyling = {
    width: '30rem',
  }

  return (
    <Navbar>
      <Link to="/">
        <img src={logo} alt="The Story Store logo" style={logoStyling} />
      </Link>
      <Buttons>
        {userLoggedIn ? (
          <LoggedInUserPresentation>
            <Greeting>{userName}</Greeting>
          </LoggedInUserPresentation>
        ) : (
          <Link to="/login">
            <LoginBtn>Log In</LoginBtn>
          </Link>
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

const LoggedInUserPresentation = styled.div`
  display: flex;
  align-items: center;
`

const Greeting = styled.p`
  color: white;
  margin-right: 2rem;
  font-size: 1.5rem;
`
const LoginBtn = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 2rem;
`
