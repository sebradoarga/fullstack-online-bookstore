import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { findAuthorByName, findBookById } from '../../../api'
import { useState, useEffect } from 'react'
import { Author, PopulatedAuthor } from '../../../types'
import { v4 as uuidv4 } from 'uuid'
import HomeNavbar from '../Navbars/HomeNavbar'
import Footer from '../../Footer'
import CartSidebar from '../../CartSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../../../redux/actions/cart'
import { RootState } from '../../../redux/reducers'
import { device } from '../../../device'

const AuthorPage = () => {
  const dispatch = useDispatch()

  const isCartOpen: boolean = useSelector(
    (state: RootState) => state.cartReducer.isCartOpen
  )

  const { author } = useParams<{ author: string }>()
  const [currentAuthor, setCurrentAuthor] = useState<Author>({
    authorName: '',
    authorPicture: '',
    authorBio: '',
    authorBooks: [],
    __v: 0,
    _id: '',
  })
  const [currentPopulatedAuthor, setCurrentPopulatedAuthor] =
    useState<PopulatedAuthor>({
      authorName: '',
      authorPicture: '',
      authorBio: '',
      authorBooks: [],
      __v: 0,
      _id: '',
    })

  const getCurrentAuthor = async () => {
    const data = await findAuthorByName(author)
    setCurrentAuthor(data.data)
  }

  const getBooksByAuthor = async () => {
    const booksByAuthor: any = await Promise.all(
      currentAuthor.authorBooks.map(async (book) => findBookById(book))
    )
    setCurrentPopulatedAuthor({
      authorName: currentAuthor.authorName,
      authorPicture: currentAuthor.authorPicture,
      authorBio: currentAuthor.authorBio,
      authorBooks: booksByAuthor,
      __v: currentAuthor.__v,
      _id: currentAuthor._id,
    })
  }

  useEffect(() => {
    getCurrentAuthor()
    window.scrollTo(0, 0)
    if (isCartOpen) {
      dispatch(toggleCart())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentAuthor.authorName !== '') {
      getBooksByAuthor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAuthor.authorName])

  return (
    <Wrapper>
      <AllContent>
        <CartSidebar />
        <HomeNavbar />
        <Container>
          <PageContent>
            <Image
              src={currentAuthor.authorPicture}
              alt={`Picture of ${currentAuthor.authorName}`}
            />
            <AuthorInfo>
              <Name>{author}</Name>
              <Bio>
                {currentAuthor.authorBio.split('\n').map((paragraph) => (
                  <Paragraph key={uuidv4()}>{paragraph}</Paragraph>
                ))}
              </Bio>
              <BooksHeader>Books</BooksHeader>
              <BooksContainer>
                {currentPopulatedAuthor.authorBooks.length > 0 &&
                  currentPopulatedAuthor.authorBooks.map((book: any) => (
                    <Link key={uuidv4()} to={`/book/${book.data.title}`}>
                      <BookCover
                        src={book.data.imageUrl}
                        alt={`Book cover for ${book.data.title}`}
                      />
                    </Link>
                  ))}
              </BooksContainer>
            </AuthorInfo>
          </PageContent>
        </Container>
      </AllContent>
      <Footer />
    </Wrapper>
  )
}

export default AuthorPage

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AllContent = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
`

const BooksContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-wrap: wrap;
  & img {
    width: 15rem;
    margin-right: 1rem;
    box-shadow: 0px 6px 12px rgb(0 0 0 / 30%);
    border-radius: 4px;
  }
`
const PageContent = styled.div`
  display: flex;
  margin-top: 13rem;
  align-items: center;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
    align-items: flex-start;
  }
`
const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  margin-top: 3rem;

  @media ${device.laptop} {
    margin-top: 0;
  }
`
const Image = styled.img`
  max-width: 25rem;
  max-height: 25rem;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
  margin-top: 1.5rem;
  box-shadow: 0px 6px 12px rgb(0 0 0 / 30%);
`
const Name = styled.h1`
  font-size: 5rem;
`
const Bio = styled.div`
  max-height: 30rem;
  padding-right: 2rem;
  overflow-y: auto;
  margin-top: 1rem;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #130912;
    border-radius: 10px;
  }
`

const Paragraph = styled.p`
  margin-top: 2rem;
  font-size: 1.5rem;
`
const BooksHeader = styled.h2`
  font-size: 3rem;
  margin-top: 2rem;
`
const BookCover = styled.img`
  width: 20rem;
  height: 23rem;
  object-fit: cover;
  boxshadow: 0px 6px 12px rgb(0 0 0 / 30%);
  border-radius: 4px;
`
