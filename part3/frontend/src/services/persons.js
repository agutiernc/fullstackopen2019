// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'

// gets data from json server
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then( response => response.data )
}

// creates new data when user submits form
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then( response => response.data )
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then( response => response.data )
}

const destroy = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( response => response.data )
}

export default {getAll, create, update, destroy}