import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const createAuthor = async (
  author: AuthorDocument
): Promise<AuthorDocument> => {
  return author.save()
}

export default { createAuthor }
