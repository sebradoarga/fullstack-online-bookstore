import { Request, Response, NextFunction } from 'express'

import Author, { AuthorDocument } from '../models/Author'
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

export const populateAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providedData = req.body
    await Promise.all(
      providedData.map(async (givenAuthor: any) => {
        const { authorName, authorPicture, authorBio, authorBooks } =
          givenAuthor
        const authorInfo = new Author({
          authorName,
          authorPicture,
          authorBio,
          authorBooks,
        })
        await AuthorService.createAuthor(authorInfo)
        res.json(givenAuthor)
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

// GET /authors
export const findAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAllAuthors())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors/name/:authorName
export const findAuthorByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAuthorByName(req.params.authorName))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors/id/:authorId
export const findAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAuthorById(req.params.authorId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /authors/:authorId
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await AuthorService.updateAuthor(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
