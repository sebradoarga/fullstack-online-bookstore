import styled from 'styled-components'
import carousel1 from '../../../images/carousel1.png'
import carousel2 from '../../../images/carousel2.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { device } from '../../../device'

const Carousel = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <Container {...settings}>
      <Wrap>
        <img src={carousel1} alt="Our new releases" />
      </Wrap>
      <Wrap>
        <img
          src={carousel2}
          alt="'To sleep in a sea of stars' by Christopher Paolini Promo"
        />
      </Wrap>
    </Container>
  )
}

export default Carousel

const Container = styled(Slider)`
  width: 95%;
  margin: 2rem auto;

  @media ${device.laptop} {
    width: 80%;
    margin: 4rem auto;
  }
`
const Wrap = styled.div``
