import { useState, useEffect } from 'react'
import './App.css'
import axios from './axios'
import { Book, ServerResponse } from './types'
import Home from './components/pages/Home/Home'
import BookPage from './components/pages/BookPage/BookPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const [books, setBooks] = useState<Book[]>([])

  const getBooks = async () => {
    try {
      const req: ServerResponse = await axios.get('/books')
      setBooks(req.data)
      console.log('successfully retrieved books from db')
    } catch (error) {
      console.log('db connection error')
    }
  }

  useEffect(() => {
    console.log('getting books')
    getBooks()
    console.log('Books:', books)
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home books={books} />
        </Route>
      </Switch>
      <Route exact path="/book/:book">
        <BookPage books={books} />
      </Route>
    </Router>
  )
}

export default App
