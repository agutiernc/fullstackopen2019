// Fullstack Open - 2019
// Alfonso Gutierrez
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect( () => {
    props.initializeAnecdotes()
  }, [props])
  
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)