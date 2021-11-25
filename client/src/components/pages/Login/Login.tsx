import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import LoginNavbar from '../Navbars/LoginNavbar'
import Footer from '../../Footer'
import { GoogleLogin } from 'react-google-login'
import { findBookById, findUserById, localLogin, login } from '../../../api'
import { useDispatch } from 'react-redux'
import { addUserData, logInUser } from '../../../redux/actions/cart'
import { Book, User } from '../../../types'
import { AxiosResponse } from 'axios'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [justLoggedIn, setJustLoggedIn] = useState<boolean>(false)

  const [dbUser, setDbUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    order: [],
  })

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const [cartBooks, setCartBooks] = useState<Book[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setJustLoggedIn(false)
  }, [])

  const getUser = async (userId: string) => {
    const response: any = await findUserById(userId)
    const data: User = await response.data
    setDbUser(data)
  }

  useEffect(() => {
    if (dbUser && dbUser.firstName !== '' && dbUser.order) {
      setJustLoggedIn(true)

      getInitialBooks()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser])

  const getBook = async (bookId: string) => {
    const response: any = await findBookById(bookId)
    const data = await response.data
    return data
  }

  // function to get all the objects of the books that are already in the db order
  const getInitialBooks = async () => {
    const promises = dbUser.order.map(async (bookId) => {
      const retrievedBook = await getBook(bookId)
      return retrievedBook
    })

    const retrievedBooks = await Promise.all(promises)
    setCartBooks(retrievedBooks)
  }

  useEffect(() => {
    if (justLoggedIn) {
      dispatch(logInUser(cartBooks))
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartBooks])

  const responseGoogle = async (response: any) => {
    const tokenObj = {
      id_token: response.tokenId,
    }
    const result: any = await login(tokenObj)

    result &&
      dispatch(
        addUserData(
          `${result.data.userData.firstName} ${result.data.userData.lastName}`,
          result.data.userData.email,
          result.data.userData._id
        )
      )

    getUser(result.data.userData._id)

    result && localStorage.setItem('token', response.tokenId)
  }

  interface LoginData {
    email: string
    password: string
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const signinResult: AxiosResponse<any> = await localLogin(loginData)

    signinResult &&
      dispatch(
        addUserData(
          `${signinResult.data.result.firstName} ${signinResult.data.result.lastName}`,
          signinResult.data.result.email,
          signinResult.data.result.id
        )
      )

    setDbUser({
      firstName: signinResult.data.result.firstName,
      lastName: signinResult.data.result.lastName,
      email: signinResult.data.result.email,
      order: signinResult.data.result.order,
    })

    signinResult && localStorage.setItem('token', signinResult.data.token)
  }

  return (
    <Container>
      <PageContent>
        <LoginNavbar />
        <PageHeader>Log In</PageHeader>
        <FormWrapper>
          <form
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Label htmlFor="email">Email:</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            ></Input>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            ></Input>
            <SubmitBtn type="submit" value="Log In"></SubmitBtn>
          </form>
        </FormWrapper>
        <CTAText>Don't have an account yet?</CTAText>
        <Link to="/signup">
          <SignupBtn>Sign Up</SignupBtn>
        </Link>
        <GoogleContainer>
          <GoogleText>Log in with Google</GoogleText>
          <GoogleLoginWrapper>
            <GoogleLogin
              clientId="1082464560224-uhrnod2mojkoh61hag9tiua5qktdgekv.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </GoogleLoginWrapper>
        </GoogleContainer>
      </PageContent>
      <Footer />
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`
const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
`

const PageHeader = styled.h1`
  margin-top: 15rem;
  text-align: center;
  font-size: 2.5rem;
  text-transform: capitalize;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Label = styled.label`
  font-size: 1.8rem;
  margin-top: 1.4rem;
  display: block;
`

const Input = styled.input`
  display: block;
  width: 36rem;
  height: 3rem;
  margin-top: 0.5rem;
  font-size: 2rem;
  padding-left: 0.6rem;
`
const SubmitBtn = styled.input`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  border-radius: 15px;
  border: none;
  font-size: 1.5rem;
  align-self: center;
  color: white;
  background: black;
  cursor: pointer;
  letter-spacing: 0.1rem;

  &:hover {
    cursor: pointer;
  }
`
const CTAText = styled.h2`
  text-align: center;
  margin-top: 2rem;
`
const SignupBtn = styled.button`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  border-radius: 15px;
  border: none;
  font-size: 1.5rem;
  color: white;
  background: black;
  cursor: pointer;
  letter-spacing: 0.1rem;

  &:hover {
    cursor: pointer;
  }
`
const GoogleContainer = styled.div`
  margin-top: 3rem;
  border: 1px solid #130912;
  padding: 2rem;
  border-radius: 5px;
`

const GoogleText = styled.h3`
  font-size: 1.8rem;
  letter-spacing: 0.2rem;
`
const GoogleLoginWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`
