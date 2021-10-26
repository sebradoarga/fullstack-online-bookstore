import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const createAuthor = async (
  author: AuthorDocument
): Promise<AuthorDocument> => {
  return author.save()
}

const findAllAuthors = async (): Promise<AuthorDocument[]> => {
  return Author.find().populate({ path: 'authorBooks' })
}

const findAuthorByName = async (
  authorName: string
): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findOne({
    authorName: `${authorName}`,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorName} not found`)
  }

  return foundAuthor
}

const findAuthorById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const updateAuthor = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

export default {
  createAuthor,
  findAllAuthors,
  findAuthorByName,
  updateAuthor,
  findAuthorById,
}
