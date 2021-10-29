import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import BookService from '../services/book'
import { BadRequestError } from '../helpers/apiError'
import axios from 'axios'
import { AuthorDocument } from '../models/Author'

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, genres, description, price, imageUrl } = req.body

    const book = new Book({
      title,
      author,
      genres,
      description,
      price,
      imageUrl,
    })

    await BookService.createBook(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const populateBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providedData = req.body
    await Promise.all(
      providedData.map(async (providedBook: any) => {
        const { title, genres, description, price, imageUrl } = providedBook
        const authorName = providedBook.author
        const authorIds: string[] = []

        console.log('!!!!!!!!!!!!!!!!authorName', authorName)
        await Promise.all(
          authorName.map(async (oneAuthor: string) => {
            console.log('oneAuthor', oneAuthor)
            const response = await axios.get(
              `http://localhost:5000/api/v1/authors/name/${oneAuthor}`
            )
            const authorObject: AuthorDocument = response.data
            console.log('!!!!!!!!!!!!!!!!!!!authorObject', authorObject)
            console.log('!!!!!!!!!!!!!!!!authorObject id', authorObject._id)
            authorIds.push(authorObject._id)
            console.log('!!!!!!!!!!!!!!!authorIds', authorIds)
          })
        )
        const author = authorIds
        const bookInfo = new Book({
          title,
          author,
          genres,
          description,
          price,
          imageUrl,
        })
        console.log('~~~~~~!!!!!!!!!!!!bookInfo', bookInfo)
        await BookService.createBook(bookInfo)
        res.json(providedBook)
      })
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await BookService.updateBook(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/bookid/:bookId
export const findBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findBookById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAllBooks())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/:title
export const findBookByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('parameter title', req.params.title)
    res.json(await BookService.findBookByTitle(req.params.title))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      console.log('weve got an error')
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log('another error)')
      next(error)
    }
  }
}
