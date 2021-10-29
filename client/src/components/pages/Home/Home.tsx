import BooksContainer from './BooksContainer'
import HomeNavbar from '../Navbars/HomeNavbar'
import Hero from './Hero'
import Carousel from './Carousel'
import Footer from '../../Footer'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import CartSidebar from '../../CartSidebar'
const Home = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <PageWrapper>
        <PageContent>
          <CartSidebar />
          <HomeNavbar />
          <Hero />
          <Carousel />
          <BooksContainer />
        </PageContent>
        <Footer />
      </PageWrapper>
    </div>
  )
}

export default Home

const PageWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between
min-height: 100vh`

const PageContent = styled.div``
