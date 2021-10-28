import styled from 'styled-components'
import heroImg from '../../../images/hero.png'

const imageStyling = {
  width: '90%',
}

const Hero = () => {
  return (
    <Container>
      <img src={heroImg} alt="" style={imageStyling} />
    </Container>
  )
}

export default Hero

const Container = styled.div`
  height: 65rem;
  display: flex;
  justify-content: center;
  padding-top: 6rem;
  background: #130912;
`
