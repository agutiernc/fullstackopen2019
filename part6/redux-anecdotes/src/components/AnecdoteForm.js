// Fullstack Open - 2019
// Alfonso Gutierrez
import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    event.target.anecdote.value = ''

    props.createAnecdote(content)

    props.setNotification(`Added new anecdote: "${content}"`, 10)
  }
  
  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )

}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)