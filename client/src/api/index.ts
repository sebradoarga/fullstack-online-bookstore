import axios from 'axios'
import { Author, LoginDataInterface, SignupDataInterface, User } from '../types'

const url = 'https://story-store-fullstack.herokuapp.com/api/v1/'

// Books

export const fetchBooks = () => axios.get(`${url}/books`)

export const createBook = (newBook: any, user: any) =>
  axios.post(`${url}/books`, {
    newBook: newBook,
    data: { user: user },
  })

export const fetchAuthors = () => axios.get(`${url}/authors`)

export const findBookByTitle = (title: string) =>
  axios.get(`${url}/books/title/${title}`)

export const findBookById = (id: string) =>
  axios.get(`${url}/books/bookid/${id}`)

export const deleteBook = (bookId: string, user: any) =>
  axios.delete(`${url}/books/${bookId}`, {
    data: { user: user },
  })

// Authors

export const createAuthor = (newAuthor: any, user: any) =>
  axios.post(`${url}/authors`, {
    newAuthor: newAuthor,
    data: { user: user },
  })

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
  axios.post(`${url}/localLogin/signup`, formData)

export const localLogin = (formData: LoginDataInterface) =>
  axios.post(`${url}/localLogin/login`, formData)
