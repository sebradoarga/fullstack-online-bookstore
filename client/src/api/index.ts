import axios from 'axios'
import { Author, LoginDataInterface, SignupDataInterface, User } from '../types'

const url = 'http://localhost:5000/api/v1'

// Books

export const fetchBooks = () => axios.get(`${url}/books`)
export const createBook = (newBook: any) => axios.post(`${url}/books`, newBook)

export const fetchAuthors = () => axios.get(`${url}/authors`)

export const findBookByTitle = (title: string) =>
  axios.get(`${url}/books/title/${title}`)

export const findBookById = (id: string) =>
  axios.get(`${url}/books/bookid/${id}`)

export const deleteBook = (bookId: string) =>
  axios.delete(`${url}/books/${bookId}`)

// Authors

export const createAuthor = (newAuthor: any) =>
  axios.post(`${url}/authors`, newAuthor)

export const findAuthorByName: any = (authorName: string) =>
  axios.get(`${url}/authors/name/${authorName}`)

export const findAuthorById: any = (authorId: string) =>
  axios.get(`${url}/authors/id/${authorId}`)

export const updateAuthor = (authorId: string, updatedAuthor: Author) =>
  axios.put(`${url}/authors/${authorId}`, updatedAuthor)

// Users

export const login = (tokenObj: any) =>
  axios.post(`${url}/google/login`, tokenObj)

export const updateUser = (userId: string, updatedUser: User) =>
  axios.put(`${url}/users/${userId}`, updatedUser)

export const findUserById = (userId: string) =>
  axios.get(`${url}/users/${userId}`)

export const signup = (formData: SignupDataInterface) =>
  axios.post(`${url}/login/signup`, formData)

export const localLogin = (formData: LoginDataInterface) =>
  axios.post(`${url}/login/login`, formData)
