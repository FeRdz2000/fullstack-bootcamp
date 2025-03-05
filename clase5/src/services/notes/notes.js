import axios from 'axios'

export const getAll = () => {
    return axios.get('http://localhost:3000/api/notes')
        .then(response => {
            const { data } = response
            return data
        })
}

export const create = ({ content }) => {
    return axios.post('http://localhost:3000/api/notes', { content })
        .then(response => {
            const { data } = response
            return data
        })
}