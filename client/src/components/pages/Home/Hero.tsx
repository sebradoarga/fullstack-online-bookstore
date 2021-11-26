import styled from 'styled-components'
import { device } from '../../../device'
import heroImg from '../../../images/hero-transparent.png'

const Hero = () => {
  return (
    <Container>
      <Image
        src={heroImg}
        alt="Promotional picture for our Halloween book selection"
      />
    </Container>
  )
}

export default Hero

const Container = styled.div`
  height: 35rem;
  display: flex;
  justify-content: center;
  padding-top: 6rem;
  background: #130912;
  width: 100%;

  @media ${device.laptop} {
    height: 65rem;
  }
`
const Image = styled.img`
  width: 100%;
  object-fit: contain;

  @media ${device.laptop} {
    width: 90%
    object-fit: cover;
  }
`
