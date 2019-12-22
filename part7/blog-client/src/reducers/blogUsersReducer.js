import blogUsersService from '../services/users'

const blogUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGGERS':
      console.log('action from blogUsersReducer:', action.data)
      return action.data
    default:
      return state
  }
}

export const initializeBlogUsers = () => {
  return async dispatch => {
    const blogUsers = await blogUsersService.getAll()

    dispatch({
      type: 'INIT_BLOGGERS',
      data: blogUsers
    })
  }
}

export default blogUsersReducer