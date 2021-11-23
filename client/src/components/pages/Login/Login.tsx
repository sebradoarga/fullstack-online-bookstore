import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleSubmit = () => {}

  interface LoginData {
    email: string
    password: string
  }

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  })

  return (
    <Container>
      <PageHeader>Log In</PageHeader>
      <FormWrapper>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
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
            type="text"
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
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PageHeader = styled.h1`
  margin-top: 3rem;
  text-align: center;
  font-size: 2.5rem;
  text-transform: capitalize;
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
