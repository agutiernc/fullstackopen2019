import blogService from '../services/blogs'
import { initializeBlogUsers } from '../reducers/blogUsersReducer'

export const createBlog = (blog) => {

  return async dispatch => {
    await blogService.create(blog)

    const data = await blogService.getAll()

    dispatch({
      type: 'NEW_BLOG',
      data: data[data.length - 1]
    })

    // to trigger blogUsers state with update
    dispatch( initializeBlogUsers() )
  }
}

export const addComment = (blog, content) => {

  return async dispatch => {
    await blogService.createComment(blog.id, { message: content })

    const data = await blogService.getAll()

    dispatch({
      type: 'CREATE_COMMENT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })

    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = (id) => {

  return async dispatch => {
    await blogService.destroy(id)

    dispatch({
      type: 'REMOVE',
      data: id
    })

    // to trigger blogUsers state with update
    dispatch( initializeBlogUsers() )
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOG':
      return action.data
    case 'CREATE_COMMENT':
      return action.data
    case 'LIKE':
      const id = action.data.id
      const blogToUpdate = state.find(b => b.id === id)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      return state.map(b => b.id !== id ? b : updatedBlog)
    case 'REMOVE':
      return state.filter(b => b.id !== action.data)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export default blogReducer