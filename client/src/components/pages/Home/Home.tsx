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
import { Link } from 'react-router-dom'

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
          <CategoryName>Horror</CategoryName>
          <BooksContainer filterCriterium="horror" />
          <CategoryName>Fantasy</CategoryName>
          <BooksContainer filterCriterium="fantasy" />
          <CategoryName>Romance</CategoryName>
          <BooksContainer filterCriterium="romance" />
          <CategoryName>SF</CategoryName>
          <BooksContainer filterCriterium="science fiction" />
          <CategoryName>Mystery</CategoryName>
          <BooksContainer filterCriterium="mystery" />
          <BrowseHeader>Browse by Genre</BrowseHeader>
          <Categories>
            <Link to={`/genres/classics`}>Classics</Link>
            <Link to={`/genres/fantasy`}>Fantasy</Link>
            <Link to={`/genres/historical fiction`}>Historical Fiction</Link>
            <Link to={`/genres/horror`}>Horror</Link>
            <Link to={`/genres/mystery`}>Mystery</Link>
            <Link to={`/genres/nonfiction`}>Nonfiction</Link>
            <Link to={`/genres/fiction`}>Fiction</Link>
            <Link to={`/genres/poetry`}>Poetry</Link>
            <Link to={`/genres/romance`}>Romance</Link>
            <Link to={`/genres/science fiction`}>Science Fiction</Link>
            <Link to={`/genres/thriller`}>Thriller</Link>
            <Link to={`/genres/young adult`}>Young Adult</Link>
          </Categories>
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

const CategoryName = styled.div`
  margin-top: 8rem;
  margin-left: 8.5rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: white;
  background: #130912;
  width: 20rem;
  padding-left: 0.5rem;
  font-weight: bold;
`
const BrowseHeader = styled.h2`
  margin-top: 8rem;
  margin-left: 8rem;
  font-size: 2rem;
`

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  height: 15rem;
  flex-wrap: wrap;
  margin-top: 4rem;
  margin-left: 15rem;
  font-size: 1.8rem;
  & * {
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    &:hover {
      color: #f4922e;
    }
  }
`
