import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import axios from './axios'
import { Book, ServerResponse } from './types'
import Home from './components/pages/Home/Home'
import BookPage from './components/pages/BookPage/BookPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthorPage from './components/pages/AuthorPage/AuthorPage'
import AddBookPage from './components/pages/AddBookPage/AddBookPage'

import { getBooks } from './redux/actions/books'

function App() {
  const dispatch = useDispatch()
  const [books, setBooks] = useState<Book[]>([])

  // const getBooks = async () => {
  //   try {
  //     const req: ServerResponse = await axios.get('/books')
  //     setBooks(req.data)
  //     console.log('successfully retrieved books from db')
  //   } catch (error) {
  //     console.log('db connection error')
  //   }
  // }

  // useEffect(() => {
  //   console.log('getting books')
  //   getBooks()
  //   console.log('Books:', books)
  // }, [])

  useEffect(() => {
    console.log('use effect in app.tsx')
    dispatch(getBooks())
  }, [dispatch])

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
