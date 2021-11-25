import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../../../images/logo-transparent-background.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { logout, toggleCart } from '../../../redux/actions/cart'
import { RootState } from '../../../redux/reducers'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LogoutIcon from '@mui/icons-material/Logout'
import { device } from '../../../device'

const HomeNavbar = () => {
  const dispatch = useDispatch()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [logoutDropdownOpen, setLogoutDropdownOpen] = useState(false)

  const userLoggedIn: boolean = useSelector(
    (state: RootState) => state.cartReducer.userLoggedIn
  )

  const userName: string = useSelector(
    (state: RootState) => state.cartReducer.userName
  )

  const userEmail: string = useSelector(
    (state: RootState) => state.cartReducer.userEmail
  )

  const linkInlineStyling = {
    fontSize: '1.5rem',
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
  }

  const cartClicked = () => {
    dispatch(toggleCart())
  }

  const hideDropdown = {
    display: 'none',
  }

  const displayDropdown = {
    display: 'flex',
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const hideLogoutDropdown = {
    display: 'none',
  }

  const displayLogoutDropdown = {
    display: 'flex',
  }

  const toggleLogoutDropdown = () => {
    setLogoutDropdownOpen(!logoutDropdownOpen)
  }

  const backgroundOnOpen = {
    background: '#271325',
  }

  return (
    <Navbar>
      <Link to="/">
        <Logo src={logo} alt="The Story Store logo" />
      </Link>
      <Buttons>
        {userEmail === 'raduoarga95@gmail.com' && (
          <DropDown onClick={() => toggleDropdown()}>
            <AdminBtn style={dropdownOpen ? backgroundOnOpen : {}}>
              <SettingsIcon fontSize="large" style={{ marginTop: '0.4rem' }} />
              <BtnText>Admin</BtnText>
            </AdminBtn>
            <AddBookBtn style={dropdownOpen ? displayDropdown : hideDropdown}>
              <Link to="/addbook" style={linkInlineStyling}>
                <MenuBookIcon fontSize="large" />
                <p style={{ marginLeft: '0.7rem' }}>Add book</p>
              </Link>
            </AddBookBtn>
          </DropDown>
        )}
        <CartButton onClick={cartClicked}>
          <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
        </CartButton>
        {userLoggedIn ? (
          <LogoutDropDown onClick={() => toggleLogoutDropdown()}>
            <LoggedInUserPresentation
              style={logoutDropdownOpen ? backgroundOnOpen : {}}
            >
              <Greeting>{userName}</Greeting>
            </LoggedInUserPresentation>

            <LogoutBtn
              style={
                logoutDropdownOpen ? displayLogoutDropdown : hideLogoutDropdown
              }
              onClick={() => dispatch(logout())}
            >
              <LogoutIcon fontSize="large" />
              <p style={{ marginLeft: '0.7rem' }}>Log out</p>
            </LogoutBtn>
          </LogoutDropDown>
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
  z-index: 9000;
`
const Logo = styled.img`
  height: 9.5rem;
  object-fit: contain;

    max-width: 65%;

  @media ${device.tablet} {
    max-width: 100%;

`

const Buttons = styled.div`
  display: flex;
  align-items: center;
`

const LoginBtn = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 2rem;
`

const CartButton = styled.button`
  background: none;
  border: none;
  margin-right: 2rem;
  cursor: pointer;
`

const Greeting = styled.p`
  color: white;
  font-size: 1.5rem;
  text-align: center;
`
const DropDown = styled.div`
  position: relative;
  margin-right: 2rem;
`

const LogoutDropDown = styled.div`
  position: relative;
`

const LoggedInUserPresentation = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 10rem;
  padding: 1.5rem;

  &:hover {
    background: #271325;
  }
`
const AdminBtn = styled.button`
  display: flex;
  align-items: center;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1.5rem;
  height: 10rem;
  overflow: hidden;
  width: 100%;

  &:hover {
    background: #271325;
  }
`

const AddBookBtn = styled.div`
  position: absolute;
  z-index: 10000;
  background: #271325;
  width: 100%;
  text-align: center;
  display: flex;
  padding-bottom: 0.6rem;
`
const LogoutBtn = styled.button`
  position: absolute;
  z-index: 10000;
  background: #271325;
  width: 100%;
  text-align: center;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  padding-bottom: 1.1rem;
`

const BtnText = styled.h2`
  font-size: 1.5rem;
  margin-left: 0.7rem;

  @media ${device.laptop} {
    font-size: 2rem;
  }
`
