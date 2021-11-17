import styled from 'styled-components'
import { Book } from '../../../types'
import { Link } from 'react-router-dom'
import { device } from '../../../device'

const DisplayedBook = ({ book }: { book: Book }) => {
  return (
    <BookContainer>
      <Link to={`/book/${book.title}`}>
        <Image src={book.imageUrl} alt={`Book cover for ${book.title}`} />
      </Link>
    </BookContainer>
  )
}

export default DisplayedBook

const BookContainer = styled.div`
  margin: 0 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 15%;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.025);
  }

  @media ${device.laptop} {
    margin: 0 2rem;
  }
`

const Image = styled.img`
  width: 7rem;
  height: 12rem;
  object-fit: center;
  boxshadow: 0px 6px 12px rgb(0 0 0 / 30%);
  border-radius: 4px;

  @media ${device.laptop} {
    width: 20rem;
    height: 30rem;
  }
`
