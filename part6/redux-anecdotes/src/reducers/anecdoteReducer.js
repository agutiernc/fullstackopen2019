// Fullstack Open - 2019
// Alfonso Gutierrez
import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const upVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })

    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToUpdate = state.find( a => a.id === id )
      const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }

      return state.map( a => a.id !== id ? a : updatedAnecdote )
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export default anecdoteReducer