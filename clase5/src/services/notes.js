import axios from 'axios'

let token = ''

export const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

export const getAll = () => {
    return axios.get('http://localhost:3000/api/notes')
        .then(response => {
            const { data } = response
            return data
        })
}

export const create = (newObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return axios.post('http://localhost:3000/api/notes', newObject, config)
        .then(response => {
            const { data } = response
            return data
        })
}

export const update = (id, newObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    return axios.put(`http://localhost:3000/api/notes/${id}`, newObject, config)
        .then(response => {
            const { data } = response
            return data
        })
}