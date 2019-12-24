const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MSG':
      return action.content
    case 'RESET_MSG':
      return initialState
    default:
      return state
  }
}

export const setNotification = (content = { text: null, type: null }, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MSG',
      content
    })

    setTimeout( () => {
      dispatch({
        type: 'RESET_MSG'
      })
    }, time * 1000)
  }
}

export default notificationReducer