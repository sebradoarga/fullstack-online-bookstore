import React from 'react'
import { Book } from '../../../types'
import BooksContainer from './BooksContainer'

const Home = ({ books }: { books: Book[] }) => {
  return (
    <div>
      <BooksContainer books={books} />
    </div>
  )
}

export default Home
