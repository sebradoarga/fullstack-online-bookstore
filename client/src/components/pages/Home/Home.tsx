import BooksContainer from './BooksContainer'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to="/addbook">Add book</Link>
      <BooksContainer />
    </div>
  )
}

export default Home
