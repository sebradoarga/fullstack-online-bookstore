import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBook } from '../../../redux/actions/books'
import { Author } from '../../../types'
import { RootState } from '../../../redux/reducers'
import { v4 as uuidv4 } from 'uuid'
import AddAuthorModal from './AddAuthorModal'
import {
  findAuthorById,
  findAuthorByName,
  findBookByTitle,
  updateAuthor,
} from '../../../api'

const AddBookPage = () => {
  // DECLARATIONS

  const dispatch = useDispatch()

  // All authors currently saved in the API
  const authors: Author[] = useSelector(
    (state: RootState) => state.authorsReducer.authors
  )

  const [bookData, setBookData] = useState({
    title: '',
    genres: '',
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
  const onSuggestHandler = (textValue: string, textPosition: string) => {
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
      console.log('text1', text.text1)
      if (text.text1 !== '') {
        const firstFoundAuthor: any = await findAuthorByName(text.text1)
        console.log('firstFoundAuthor is', firstFoundAuthor)

        setAuthorIds({ ...authorIds, author1: firstFoundAuthor.data._id })
        if (text.text2 !== '') {
          const secondFoundAuthor: any = await findAuthorByName(text.text2)
          console.log('secondFoundAuthor is', secondFoundAuthor)

          setAuthorIds({ ...authorIds, author2: secondFoundAuthor.data._id })
          if (text.text3 !== '') {
            const thirdFoundAuthor: any = await findAuthorByName(text.text3)
            console.log('thirdFoundAuthor is', thirdFoundAuthor)

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
    console.log('bookData.author', bookData.author)
    console.log(bookData.author !== [''])
    const addBookToAuthor = async () => {
      console.log('hello', bookData)

      if (allAuthors) {
        console.log('i am in')
        console.log('final book data', bookData)
        await dispatch(createBook(bookData))
        const createdBook: any = await findBookByTitle(bookData.title)

        console.log('createdBook', createdBook)
        const author = await findAuthorById(bookData.author)

        const newAuthorData: Author = {
          ...author.data,
          authorBooks: [createdBook.data._id],
        }

        const updatedAuthor = await updateAuthor(author.data._id, newAuthorData)
      }
    }

    if (bookData.author[0] !== '') {
      addBookToAuthor()
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

  // **************************************

  return (
    <Container>
      <AddAuthorModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={text}
        setText={setText}
        currentAuthorBox={currentAuthorBox}
      />

      <Link to="/">Go back</Link>

      <form autoComplete="off" onSubmit={handleSubmit}>
        {/* --BOOK TITLE INPUT-- */}

        <Label htmlFor="title">Book Title:</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
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
                onClick={() => onSuggestHandler(suggestion.authorName, 'text1')}
              >
                {suggestion.authorName}
              </Suggestion>
            ))
          ) : (
            <Suggestion onClick={() => openModal(1)}>Add new author</Suggestion>
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
                onClick={() => onSuggestHandler(suggestion.authorName, 'text2')}
              >
                {suggestion.authorName}
              </Suggestion>
            ))
          ) : (
            <Suggestion onClick={() => openModal(2)}>Add new author</Suggestion>
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
                onClick={() => onSuggestHandler(suggestion.authorName, 'text3')}
              >
                {suggestion.authorName}
              </Suggestion>
            ))
          ) : (
            <Suggestion onClick={() => openModal(3)}>Add new author</Suggestion>
          ))}

        <MoreAuthorsBtn
          style={authorsNumber > 2 ? hideAuthorStyle : showAuthorStyle}
          onClick={addAnotherAuthor}
        >
          +
        </MoreAuthorsBtn>

        {/* --GENRES INPUT-- */}

        <Label htmlFor="genres">Genres:</Label>
        <Input
          type="text"
          id="genres"
          name="genres"
          value={bookData.genres}
          onChange={(e) => setBookData({ ...bookData, genres: e.target.value })}
        ></Input>

        {/* --DESCRIPTION INPUT-- */}

        <Label htmlFor="description">Description:</Label>
        <Input
          type="textarea"
          id="description"
          name="description"
          value={bookData.description}
          onChange={(e) =>
            setBookData({ ...bookData, description: e.target.value })
          }
        ></Input>

        {/* --PRICE INPUT-- */}

        <Label htmlFor="price">Price:</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={bookData.price}
          onChange={(e) =>
            setBookData({ ...bookData, price: parseInt(e.target.value) })
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
    </Container>
  )
}

export default AddBookPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 8rem auto;
`
const Label = styled.label`
  font-size: 1.8rem;
`

const Input = styled.input`
  display: block;
  width: 16rem;
  margin-top: 0.5rem;
`
const SubmitBtn = styled.input`
  margin-top: 2rem;
  padding: 0.5rem 1rem;

  &:hover {
    cursor: pointer;
  }
`
const Suggestion = styled.div`
  border-right: 0.1rem solid black;
  border-left: 0.1rem solid black;
  border-bottom: 0.1rem solid black;
  width: 16rem;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    background: #ffeb3b4a;
  }
`
const MoreAuthorsBtn = styled.a`
  display: block;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`
