import styled from 'styled-components'
import DisplayedBook from './DisplayedBook'
import { Book } from '../../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Link } from 'react-router-dom'
import { device } from '../../../device'

const BooksContainer = ({ filterCriterium }: { filterCriterium: string }) => {
  const books: Book[] = useSelector(
    (state: RootState) => state.booksReducer.books
  )

  const filteredBooks = books.filter((book) => {
    if (book.genres.includes(filterCriterium)) {
      return true
    }
  })

  return (
    <Wrapper>
      <Container>
        {filteredBooks.slice(0, 5).map((book: Book) => (
          <DisplayedBook key={book._id} book={book} />
        ))}
      </Container>
      <Link to={`/genres/${filterCriterium}`}>
        <MoreBtn>
          <NavigateNextIcon fontSize="large" />
          <SeeMore>See more</SeeMore>
        </MoreBtn>
      </Link>
    </Wrapper>
  )
}

export default BooksContainer

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 32rem;
  margin: 0 auto;

  @media ${device.mobileL} {
    max-width: 42rem;
  }

  @media ${device.mobileXL} {
    max-width: 61.5rem;
  }

  @media ${device.tablet} {
    max-width: 86rem;
  }

  @media ${device.laptop} {
    flex-direction: row;
    max-width: 140rem;
  }
`

const Container = styled.div`
  width: 80%;
  margin-top: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: no-wrap;
`
const MoreBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-left: 2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  margin-top: 1.5rem;

  &:hover {
    transform: scale(1.1);
  }

  @media ${device.laptop} {
    flex-direction: column;
    margin-top: 0;
  }
`

const SeeMore = styled.p`
  text-transform: uppercase;
  font-family: sans-serif;
  letter-spacing: 0.2rem;
  font-size: 1rem;
`
