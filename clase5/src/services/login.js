import axios from 'axios'

export const login = async (credentials) => {
    const response = await axios.post('http://localhost:3000/api/login', credentials)
    return response.data
}