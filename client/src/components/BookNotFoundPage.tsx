import React from 'react'
import Footer from './Footer'
import HomeNavbar from './pages/Navbars/HomeNavbar'
import styled from 'styled-components'

const BookNotFoundPage = () => {
  return (
    <Wrapper>
      <PageContent>
        <HomeNavbar />
        <Message>
          <Text>Sorry, we couldn't find that book.</Text>
        </Message>
      </PageContent>
      <Footer />
    </Wrapper>
  )
}

export default BookNotFoundPage

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PageContent = styled.div``

const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Text = styled.h1`
  letter-spacing: 0.3rem;
  font-size: 3rem;
`
