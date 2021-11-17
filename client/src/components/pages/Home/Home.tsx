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
import { v4 as uuidv4 } from 'uuid'
import { device } from '../../../device'

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

  const allGenres = [
    'classics',
    'fantasy',
    'historical fiction',
    'horror',
    'mystery',
    'fiction',
    'romance',
    'science fiction',
    'thriller',
    'young adult',
  ]

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
            {allGenres.map((genre) => (
              <Link key={uuidv4()} to={`/genres/${genre}`}>
                {genre}
              </Link>
            ))}
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
  margin-top: 3rem;
  margin-left: 1rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: white;
  background: #130912;
  width: 20rem;
  padding-left: 0.5rem;
  font-weight: bold;

  @media ${device.laptop} {
    margin-left: 8.5rem;
    margin-top: 8rem;
  }
`
const BrowseHeader = styled.h2`
  margin-top: 3rem;
  margin-left: 2rem;
  font-size: 2rem;

  @media ${device.laptop} {
    margin-left: 8rem;
    margin-top: 8rem;
  }
`

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  height: 15rem;
  flex-wrap: wrap;
  margin-top: 4rem;
  margin-left: 2rem;
  font-size: 1.3rem;
  & * {
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    text-transform: capitalize;
    text-align: center;
    width: 80%;

    &:hover {
      color: #f4922e;
    }

    @media ${device.laptop} {
      width: 20%;
    }
  }

  @media ${device.laptop} {
    margin-left: 15rem;
    font-size: 1.8rem;
  }
`
