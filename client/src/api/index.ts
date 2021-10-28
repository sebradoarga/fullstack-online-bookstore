import axios from 'axios'
import { Author } from '../types'

const url = 'http://localhost:5000/api/v1'

export const fetchBooks = () => axios.get(`${url}/books`)
export const createBook = (newBook: any) => axios.post(`${url}/books`, newBook)

export const fetchAuthors = () => axios.get(`${url}/authors`)

export const createAuthor = (newAuthor: any) =>
  axios.post(`${url}/authors`, newAuthor)

export const findAuthorByName: any = (authorName: string) =>
  axios.get(`${url}/authors/name/${authorName}`)

export const findAuthorById: any = (authorId: string) =>
  axios.get(`${url}/authors/id/${authorId}`)

export const updateAuthor = (authorId: string, updatedAuthor: Author) =>
  axios.put(`${url}/authors/${authorId}`, updatedAuthor)

export const findBookByTitle = (title: string) =>
  axios.get(`${url}/books/title/${title}`)

export const findBookById = (id: string) =>
  axios.get(`${url}/books/bookid/${id}`)

export const login = (tokenObj: any) =>
  axios.post(`${url}/google/login`, tokenObj)
