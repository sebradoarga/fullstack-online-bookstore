import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { createBook, getBooks } from '../../../redux/actions/books'
import { Author, User } from '../../../types'
import { RootState } from '../../../redux/reducers'
import { v4 as uuidv4 } from 'uuid'
import AddAuthorModal from './AddAuthorModal'
import {
  findAuthorById,
  findAuthorByName,
  findBookByTitle,
  findUserById,
  updateAuthor,
} from '../../../api'
import Footer from '../../Footer'
import CheckoutNavbar from '../Navbars/CheckoutNavbar'

const AddBookPage = () => {
  // DECLARATIONS

  const dispatch = useDispatch()

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

  const userId: string = useSelector(
    (state: RootState) => state.cartReducer.userId
  )

  const [dbUser, setDbUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    order: [],
  })

  const getUser = async () => {
    const response: any = await findUserById(userId)
    const data: User = await response.data
    setDbUser(data)
  }

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [activeTags, setActiveTags] = useState<string[]>([])

  // All authors currently saved in the API
  const authors: Author[] = useSelector(
    (state: RootState) => state.authorsReducer.authors
  )

  interface BookData {
    title: string
    genres: string[]
    description: string
    price: number
    imageUrl: string
    author: string[]
  }

  const [bookData, setBookData] = useState<BookData>({
    title: '',
    genres: [],
    description: '',
    price: 0,
    imageUrl: '',
    author: [''],
  })

  // -----------------------------------------------------

  // VARIABLES FOR AUTHOR INPUT FUNCTIONALITY
  const [text, setText] = useState({
    text1: '',
    text2: '',
    text3: '',
  })

  const [suggestions1, setSuggestions1] = useState<Author[] | string>([])
  const [suggestions2, setSuggestions2] = useState<Author[] | string>([])
  const [suggestions3, setSuggestions3] = useState<Author[] | string>([])
  const [authorsNumber, setAuthorsNumber] = useState(1)
  const [authorNames, setAuthorNames] = useState({
    author1: '',
    author2: '',
    author3: '',
  })
  const [authorIds, setAuthorIds] = useState({
    author1: '',
    author2: '',
    author3: '',
  })
  const [currentAuthorBox, setCurrentAuthorBox] = useState<number>(0)
  const [showSecondAuthor, setShowSecondAuthor] = useState(false)
  const [showThirdAuthor, setShowThirdAuthor] = useState(false)

  // ------------------------------------------------------

  const [showModal, setShowModal] = useState('none')

  // -----------------------------------------------------

  const [allAuthors, setAllAuthors] = useState(false)

  // AUTHOR INPUT FUNCTIONALITY

  //When typing text in author input box
  const onChangeHandler = (textValue: string, textPosition: string) => {
    let matches: Author[] = []
    if (textValue.length > 0) {
      matches = authors.filter((author) => {
        const regex = new RegExp(`${textValue}`, 'gi')
        return author.authorName.match(regex)
      })
    }
    switch (textPosition) {
      case 'text1':
        setSuggestions1(matches)
        if (matches.length < 1) {
          setSuggestions1('Add new author')
        }

        setText({ ...text, text1: textValue })
        break
      case 'text2':
        setSuggestions2(matches)
        if (matches.length < 1) {
          setSuggestions2('Add new author')
        }

        setText({ ...text, text2: textValue })
        break
      case 'text3':
        setSuggestions3(matches)
        if (matches.length < 1) {
          setSuggestions3('Add new author')
        }

        setText({ ...text, text3: textValue })
        break
      default:
        break
    }
  }

  //When choosing suggestion
  const onSuggestHandler = (
    e: any,
    textValue: string,
    textPosition: string
  ) => {
    e.persist()
    switch (textPosition) {
      case 'text1':
        setText({ ...text, text1: textValue })
        break
      case 'text2':
        setText({ ...text, text2: textValue })
        break
      case 'text3':
        setText({ ...text, text3: textValue })
        break
      default:
        break
    }
    setSuggestions1([])
    setSuggestions2([])
    setSuggestions3([])
  }

  //When the add new author button is clicked
  const openModal = (boxNumber: number) => {
    setCurrentAuthorBox(boxNumber)
    setShowModal('flex')
  }

  //When clicking outside of author input boxes
  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions1([])
      setSuggestions2([])
      setSuggestions3([])
    }, 100)
  }

  //When clicking the + button to get more author input boxes (up to 3)

  const addAnotherAuthor = () => {
    switch (authorsNumber) {
      case 1:
        setShowSecondAuthor(true)
        setAuthorsNumber(authorsNumber + 1)
        break
      case 2:
        setShowThirdAuthor(true)
        setAuthorsNumber(authorsNumber + 1)
        break
      default:
        break
    }
  }

  //END OF AUTHOR INPUT FUNCTIONALITY

  // ----------------------------------------------

  //SUBMIT FUNCTIONALITY

  //Get the given names for the author(s)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setAuthorNames({ ...authorNames, author1: text.text1 })

    //Find the authors' ids
    const findAuthors = async () => {
      if (text.text1 !== '') {
        const firstFoundAuthor: any = await findAuthorByName(text.text1)

        setAuthorIds({ ...authorIds, author1: firstFoundAuthor.data._id })
        if (text.text2 !== '') {
          const secondFoundAuthor: any = await findAuthorByName(text.text2)

          setAuthorIds({ ...authorIds, author2: secondFoundAuthor.data._id })
          if (text.text3 !== '') {
            const thirdFoundAuthor: any = await findAuthorByName(text.text3)

            setAuthorIds({ ...authorIds, author3: thirdFoundAuthor.data._id })
          }
        }
      }
      setAllAuthors(true)
    }

    findAuthors()
  }

  //Add the ids to the data for a new book
  useEffect(() => {
    if (authorIds.author1 !== '') {
      setBookData({ ...bookData, author: [authorIds.author1] })
    }
    if (authorIds.author2 !== '') {
      setBookData({
        ...bookData,
        author: [...bookData.author, authorIds.author2],
      })
    }
    if (authorIds.author3 !== '') {
      setBookData({
        ...bookData,
        author: [...bookData.author, authorIds.author3],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorIds])

  useEffect(() => {
    const addBookToAuthor = async () => {
      if (allAuthors) {
        await dispatch(createBook(bookData, dbUser))
        const createdBook: any = await findBookByTitle(bookData.title)

        const authors = await Promise.all(
          bookData.author.map(async (author) => await findAuthorById(author))
        )

        authors.map((author) => {
          const newAuthorData: Author = {
            ...author.data,
            authorBooks: [...author.data.authorBooks, createdBook.data._id],
          }
          const addBookToAuthor = async () => {
            const updatedAuthor = await updateAuthor(
              author.data._id,
              newAuthorData
            )
          }
          addBookToAuthor()
        })

        setBookData({
          title: '',
          genres: [],
          description: '',
          price: 0,
          imageUrl: '',
          author: [''],
        })

        setText({
          text1: '',
          text2: '',
          text3: '',
        })
      }
    }

    if (bookData.author[0] !== '') {
      addBookToAuthor()
      dispatch(getBooks())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookData.author])

  // INLINE STYLINGS

  const showAuthorStyle = {
    display: 'block',
  }

  const hideAuthorStyle = {
    display: 'none',
  }

  const selected = {
    color: 'black',
    fontWeight: 700,
  }

  // **************************************

  const addGenre = (genre: string) => {
    setBookData({ ...bookData, genres: [...bookData.genres, genre] })
    activeTags.includes(genre)
      ? setActiveTags(activeTags.filter((tag) => tag !== genre))
      : setActiveTags([...activeTags, genre])
  }

  return (
    <Container>
      <CheckoutNavbar />
      <PageContent>
        <AddAuthorModal
          showModal={showModal}
          setShowModal={setShowModal}
          text={text}
          setText={setText}
          currentAuthorBox={currentAuthorBox}
          dbUser={dbUser}
        />
        <PageHeader>Add a new book</PageHeader>
        <FormWrapper>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* --BOOK TITLE INPUT-- */}

            <Label htmlFor="title">Book Title:</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={(e) =>
                setBookData({ ...bookData, title: e.target.value })
              }
            ></Input>

            {/* -- AUTHOR INPUT -- */}

            {/* FIRST AUTHOR */}

            <Label htmlFor="author">Author:</Label>
            <Input
              type="text"
              id="author"
              name="author"
              onChange={(e) => onChangeHandler(e.target.value, 'text1')}
              value={text.text1}
              onBlur={() => {
                handleBlur()
              }}
            ></Input>
            {suggestions1 &&
              (Array.isArray(suggestions1) ? (
                suggestions1.slice(0, 3).map((suggestion) => (
                  <Suggestion
                    key={uuidv4()}
                    onClick={(e) =>
                      onSuggestHandler(e, suggestion.authorName, 'text1')
                    }
                  >
                    {suggestion.authorName}
                  </Suggestion>
                ))
              ) : (
                <Suggestion onClick={() => openModal(1)}>
                  Add new author
                </Suggestion>
              ))}

            {/* SECOND AUTHOR */}

            <Input
              type="text"
              id="author"
              name="author"
              onChange={(e) => onChangeHandler(e.target.value, 'text2')}
              style={showSecondAuthor ? showAuthorStyle : hideAuthorStyle}
              value={text.text2}
              onBlur={() => {
                handleBlur()
              }}
            ></Input>
            {suggestions2 &&
              (Array.isArray(suggestions2) ? (
                suggestions2.slice(0, 3).map((suggestion) => (
                  <Suggestion
                    key={uuidv4()}
                    onClick={(e) =>
                      onSuggestHandler(e, suggestion.authorName, 'text2')
                    }
                  >
                    {suggestion.authorName}
                  </Suggestion>
                ))
              ) : (
                <Suggestion onClick={() => openModal(2)}>
                  Add new author
                </Suggestion>
              ))}

            {/* THIRD AUTHOR */}

            <Input
              type="text"
              id="author"
              name="author"
              style={showThirdAuthor ? showAuthorStyle : hideAuthorStyle}
              onChange={(e) => onChangeHandler(e.target.value, 'text3')}
              value={text.text3}
              onBlur={() => {
                handleBlur()
              }}
            ></Input>
            {suggestions3 &&
              (Array.isArray(suggestions3) ? (
                suggestions3.slice(0, 3).map((suggestion) => (
                  <Suggestion
                    key={uuidv4()}
                    onClick={(e) =>
                      onSuggestHandler(e, suggestion.authorName, 'text3')
                    }
                  >
                    {suggestion.authorName}
                  </Suggestion>
                ))
              ) : (
                <Suggestion onClick={() => openModal(3)}>
                  Add new author
                </Suggestion>
              ))}

            <MoreAuthorsBtn
              style={authorsNumber > 2 ? hideAuthorStyle : showAuthorStyle}
              onClick={addAnotherAuthor}
            >
              + One More Author
            </MoreAuthorsBtn>

            {/* --GENRES INPUT-- */}

            <Label htmlFor="genres">Genres:</Label>
            <GenresContainer>
              {allGenres.map((genre) => (
                <Tag
                  key={genre}
                  onClick={() => addGenre(genre)}
                  style={activeTags.includes(genre) ? selected : {}}
                >
                  {genre}
                </Tag>
              ))}
            </GenresContainer>

            {/* --DESCRIPTION INPUT-- */}

            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              name="description"
              value={bookData.description}
              onChange={(e) =>
                setBookData({ ...bookData, description: e.target.value })
              }
            ></Textarea>

            {/* --PRICE INPUT-- */}

            <Label htmlFor="price">Price:</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={bookData.price}
              onChange={(e) =>
                setBookData({ ...bookData, price: parseFloat(e.target.value) })
              }
            ></Input>

            {/* --IMAGE INPUT-- */}

            <Label htmlFor="image">Image:</Label>
            <Input
              type="text"
              id="image"
              name="image"
              value={bookData.imageUrl}
              onChange={(e) =>
                setBookData({ ...bookData, imageUrl: e.target.value })
              }
            ></Input>
            <SubmitBtn type="submit" value="Add Book"></SubmitBtn>
          </form>
        </FormWrapper>
      </PageContent>
      <Footer />
    </Container>
  )
}

export default AddBookPage

const PageContent = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const PageHeader = styled.h1`
  margin-top: 13rem;
  text-align: center;
  font-size: 2.5rem;
  text-transform: capitalize;
`

const FormWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Label = styled.label`
  font-size: 1.8rem;
  margin-top: 1.4rem;
  display: block;
`

const Input = styled.input`
  display: block;
  width: 36rem;
  height: 3rem;
  margin-top: 0.5rem;
  font-size: 2rem;
  padding-left: 0.6rem;
`
const Textarea = styled.textarea`
  width: 36rem;
  height: 3rem;
  margin-top: 0.5rem;
  padding: 0.6rem;
  height: 15rem;
  font-size: 1.2rem;
  resize: none;

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

const GenresContainer = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const Tag = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #000000c2;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: black;
    font-weight: bold;
  }
`

const SubmitBtn = styled.input`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  border-radius: 15px;
  border: none;
  font-size: 1.5rem;
  align-self: center;
  color: white;
  background: black;
  cursor: pointer;
  letter-spacing: 0.1rem;

  &:hover {
    cursor: pointer;
  }
`

const Suggestion = styled.div`
  border-right: 0.1rem solid black;
  border-left: 0.1rem solid black;
  border-bottom: 0.1rem solid black;
  width: 36rem;
  height: 3rem;
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    background: #ffeb3b4a;
  }
`
const MoreAuthorsBtn = styled.a`
  display: block;
  font-size: 1.4rem;
  margin-top: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
