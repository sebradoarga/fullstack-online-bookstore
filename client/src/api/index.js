import axios from 'axios'

const url = 'http://localhost:5000/api/v1'

export const fetchBooks = () => axios.get(`${url}/books`)
