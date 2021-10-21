import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import AuthorService from '../services/author'
import { BadRequestError } from '../helpers/apiError'

// POST /authors
export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorName, authorPicture, authorBio, authorBooks } = req.body

    const author = new Author({
      authorName,
      authorPicture,
      authorBio,
      authorBooks,
    })

    await AuthorService.createAuthor(author)
    res.json(author)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
