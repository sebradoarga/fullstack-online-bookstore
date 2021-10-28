import BooksContainer from './BooksContainer'
import HomeNavbar from '../Navbars/HomeNavbar'
import Hero from './Hero'
import Carousel from './Carousel'
const Home = () => {
  return (
    <div>
      <HomeNavbar />
      <Hero />
      <Carousel />
      <BooksContainer />
    </div>
  )
}

export default Home
