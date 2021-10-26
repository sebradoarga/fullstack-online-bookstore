import { useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import Home from './components/pages/Home/Home'
import BookPage from './components/pages/BookPage/BookPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthorPage from './components/pages/AuthorPage/AuthorPage'
import AddBookPage from './components/pages/AddBookPage/AddBookPage'

import { getBooks } from './redux/actions/books'
import { getAuthors } from './redux/actions/authors'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
    dispatch(getAuthors())
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
