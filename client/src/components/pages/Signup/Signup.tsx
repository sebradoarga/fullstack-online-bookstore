import { useState, useEffect } from 'react'
import styled from 'styled-components'
import LoginNavbar from '../Navbars/LoginNavbar'
import Footer from '../../Footer'
import { signup } from '../../../api'
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const history = useHistory()
  const [loginError, setLoginError] = useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()
      setLoginError(false)

      const signupResult = await signup(signupData)
      history.push('/login')
    } catch (err: any) {
      setLoginError(true)
    }
  }

  interface SignupData {
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string
  }

  const [signupData, setSignupData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <PageContent>
        <LoginNavbar />

        <PageHeader>Sign Up</PageHeader>
        <ErrorMessage style={loginError ? { display: 'block' } : {}}>
          Unsuccessful registration. Please try again.
        </ErrorMessage>

        <FormWrapper>
          <form
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Label htmlFor="firstName">First Name:</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={signupData.firstName}
              onChange={(e) =>
                setSignupData({ ...signupData, firstName: e.target.value })
              }
            ></Input>
            <Label htmlFor="lastName">Last Name:</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={signupData.lastName}
              onChange={(e) =>
                setSignupData({ ...signupData, lastName: e.target.value })
              }
            ></Input>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            ></Input>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            ></Input>
            <Label htmlFor="repeatPassword">Repeat Password:</Label>
            <Input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={signupData.repeatPassword}
              onChange={(e) =>
                setSignupData({ ...signupData, repeatPassword: e.target.value })
              }
            ></Input>
            <SubmitBtn type="submit" value="Sign Up"></SubmitBtn>
          </form>
        </FormWrapper>
      </PageContent>
      <Footer />
    </Container>
  )
}

export default Signup

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
  text-transform: capitalize;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`

const ErrorMessage = styled.p`
  margin-top: 2rem;
  font-size: 1.8rem;
  color: red;
  border: 0.2rem solid red;
  padding: 0.5rem 1rem;
  display: none;
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
