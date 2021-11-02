import styled from 'styled-components'
import carousel1 from '../../../images/carousel1.png'
import carousel2 from '../../../images/carousel2.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
        <img src={carousel1} alt="A promotional picture of our new releases" />
      </Wrap>
      <Wrap>
        <img
          src={carousel2}
          alt="Promotional picture for 'To sleep in a sea of stars' by Christopher Paolini"
        />
      </Wrap>
    </Container>
  )
}

export default Carousel

const Container = styled(Slider)`
  width: 80%;
  margin: 4rem auto;
`
const Wrap = styled.div``
