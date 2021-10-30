import BooksContainer from './BooksContainer'
import HomeNavbar from '../Navbars/HomeNavbar'
import Hero from './Hero'
import Carousel from './Carousel'
import Footer from '../../Footer'
import styled from 'styled-components'
import CartSidebar from '../../CartSidebar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../../../redux/actions/cart'
import { RootState } from '../../../redux/reducers'

const Home = () => {
  const dispatch = useDispatch()

  const isCartOpen: boolean = useSelector(
    (state: RootState) => state.cartReducer.isCartOpen
  )

  useEffect(() => {
    window.scrollTo(0, 0)

    if (isCartOpen) {
      dispatch(toggleCart())
    }
  }, [])

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
