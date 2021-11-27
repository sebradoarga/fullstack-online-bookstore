import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import Home from './components/pages/Home/Home'
import BookPage from './components/pages/BookPage/BookPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthorPage from './components/pages/AuthorPage/AuthorPage'
import AddBookPage from './components/pages/AddBookPage/AddBookPage'

import { getBooks } from './redux/actions/books'
import { getAuthors } from './redux/actions/authors'
import GenrePage from './components/pages/GenrePage/GenrePage'
import Checkout from './components/pages/Checkout/Checkout'
import Login from './components/pages/Login/Login'
import Signup from './components/pages/Signup/Signup'
import { RootState } from './redux/reducers'
import { Author, Book } from './types'
import { fetchAuthors, fetchBooks, updateAuthor } from './api'

function App() {
  const dispatch = useDispatch()

  const isAdmin: boolean = useSelector(
    (state: RootState) => state.cartReducer.isAdmin
  )

  useEffect(() => {
    dispatch(getBooks())
    dispatch(getAuthors())
  }, [dispatch])

  //Update database authors with book ids
  // ONLY MEANT TO BE USED AFTER POPULATING THE WEBSITE WITH THE INITIAL BOOKS

  const [dbAuthors, setDBAuthors] = useState<Author[]>([])
  const [dbBooks, setDBBooks] = useState<Book[]>([])

  const getDBAuthors = async () => {
    const authorsResponse: any = await dispatch(fetchAuthors)
    const authors = authorsResponse.data
    setDBAuthors(authors)
  }

  const getDBBooks = async () => {
    const booksResponse: any = await dispatch(fetchBooks)
    const books = booksResponse.data
    setDBBooks(books)
  }

  useEffect(() => {
    if (dbAuthors.length > 0) {
      getDBBooks()
    }
  }, [dbAuthors])

  useEffect(() => {
    if (dbBooks.length > 0 && dbAuthors.length > 0) {
      dbAuthors.map((author) => {
        const name = author.authorName
        const filteredBooks = dbBooks.filter(
          (book) =>
            book.author.filter((bookAuthor) => bookAuthor.authorName === name)
              .length > 0
        )
        let idArray: any = []
        filteredBooks.map((book) => idArray.push(book._id))
        const newAuthor: Author = {
          ...author,
          authorBooks: idArray,
        }
        const addBooksToAuthor = async () => {
          const updatedAuthor = await updateAuthor(author._id, newAuthor)
        }

        addBooksToAuthor()
      })
    }
  }, [dbBooks])

  useEffect(() => {
    getDBAuthors()
  }, [])

  return (
    <Router>
      {isAdmin ? (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/book/:book">
            <BookPage />
          </Route>

          <Route exact path="/author/:author">
            <AuthorPage />
          </Route>

          <Route exact path="/addbook/">
            <AddBookPage />
          </Route>

          <Route exact path="/genres/:genre">
            <GenrePage />
          </Route>

          <Route exact path="/checkout">
            <Checkout />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/book/:book">
            <BookPage />
          </Route>

          <Route exact path="/author/:author">
            <AuthorPage />
          </Route>

          <Route exact path="/genres/:genre">
            <GenrePage />
          </Route>

          <Route exact path="/checkout">
            <Checkout />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      )}
    </Router>
  )
}

export default App
