import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

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

export default {getAll, create}