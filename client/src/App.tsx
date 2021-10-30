import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import Home from './components/pages/Home/Home'
import BookPage from './components/pages/BookPage/BookPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthorPage from './components/pages/AuthorPage/AuthorPage'
import AddBookPage from './components/pages/AddBookPage/AddBookPage'

import { getBooks } from './redux/actions/books'
import { getAuthors } from './redux/actions/authors'
import { fetchAuthors, fetchBooks, findBookById, updateAuthor } from './api'
import { Author, Book } from './types'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
    dispatch(getAuthors())
  }, [dispatch])

  //Update database authors with book ids

  // const [dbAuthors, setDBAuthors] = useState<Author[]>([])
  // const [dbBooks, setDBBooks] = useState<Book[]>([])

  // const getDBAuthors = async () => {
  //   const authorsResponse: any = await dispatch(fetchAuthors)
  //   const authors = authorsResponse.data
  //   setDBAuthors(authors)
  // }

  // const getDBBooks = async () => {
  //   const booksResponse: any = await dispatch(fetchBooks)
  //   const books = booksResponse.data
  //   setDBBooks(books)
  // }

  // useEffect(() => {
  //   if (dbAuthors.length > 0) {
  //     console.log('in dbAuthors')
  //     console.log('dbauthors', dbAuthors)

  //     getDBBooks()
  //   }
  // }, [dbAuthors])

  // useEffect(() => {
  //   if (dbBooks.length > 0 && dbAuthors.length > 0) {
  //     console.log('in Dbbooks')
  //     console.log('dbbooks', dbBooks)

  //     dbAuthors.map((author) => {
  //       const name = author.authorName
  //       const filteredBooks = dbBooks.filter(
  //         (book) =>
  //           book.author.filter((bookAuthor) => bookAuthor.authorName === name)
  //             .length > 0
  //       )
  //       let idArray: any = []
  //       filteredBooks.map((book) => idArray.push(book._id))
  //       console.log('bookId', idArray)
  //       const newAuthor: Author = {
  //         ...author,
  //         authorBooks: idArray,
  //       }
  //       const addBooksToAuthor = async () => {
  //         const updatedAuthor = await updateAuthor(author._id, newAuthor)
  //       }

  //       addBooksToAuthor()
  //     })
  //   }
  // }, [dbBooks])

  // useEffect(() => {
  //   getDBAuthors()
  // }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

      <Route exact path="/book/:book">
        <BookPage />{' '}
      </Route>

      <Route exact path="/author/:author">
        <AuthorPage />
      </Route>

      <Route exact path="/addbook/">
        <AddBookPage />
      </Route>
    </Router>
  )
}

export default App
