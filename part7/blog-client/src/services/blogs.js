import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = async () => {
  const response = await axios.get( baseUrl )

  return response.data
}

// sets the token to the Authorization-header and creates new data when user submits form
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.post(baseUrl, newObject, config)

  return request.data
}

const update = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.data
}

const destroy = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)

  return request.data
}

const createComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.post(`${baseUrl}/${id}/comments`, comment, config)

  return request.data
}

export default { 
  getAll,
  create,
  setToken,
  update,
  destroy,
  createComment
}