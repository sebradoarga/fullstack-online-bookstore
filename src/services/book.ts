import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const createBook = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findBookById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findAllBooks = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ _id: 1 }).populate({ path: 'author' })
}

const updateBook = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findBookByTitle = async (title: string): Promise<BookDocument> => {
  const foundBook = await Book.findOne({ title: `${title}` })
  console.log('foundBook', foundBook)

  if (!foundBook) {
    throw new NotFoundError(`Book ${title} not found`)
  }

  return foundBook
}

export default {
  createBook,
  findBookById,
  findAllBooks,
  updateBook,
  deleteBook,
  findBookByTitle,
}
