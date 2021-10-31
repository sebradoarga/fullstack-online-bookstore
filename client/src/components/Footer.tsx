import styled from 'styled-components'
import logo from '../images/logo-transparent-background.png'

const Footer = () => {
  return (
    <FooterContainer>
      <Image src={logo} alt="" />
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  width: 100%;
  background: #130912;
  display: flex;
  overflow: hidden;
  height: 6rem;
  padding: 0 3rem;
  margin-top: 6rem;
`
const Image = styled.img`
  width: 20rem;
  object-fit: cover;
`