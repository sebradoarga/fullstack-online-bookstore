import styled from 'styled-components'
import carousel1 from '../../../images/carousel1.png'

const Carousel = () => {
  const imageInlineStyling = {
    width: '100rem',
    height: '35rem',
    border: '4px solid #130912',
    borderRadius: '10px',
  }

  return (
    <Container>
      <img src={carousel1} alt="" style={imageInlineStyling} />
    </Container>
  )
}

export default Carousel

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`
