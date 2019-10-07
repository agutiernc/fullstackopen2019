// Fullstack Open - 2019
// Alfonso Gutierrez
import React from 'react'
import { connect } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = (props) => {

  const voteClick = (anecdote) => {
    props.upVote(anecdote)

    props.setNotification(`You voted for: "${anecdote.content}"`, 10)
  }

  return (
    <div>
      <Filter store={props.store} />
      {props.visibleAnecdotes.sort( (a, b) => b.votes - a.votes ).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteClick(anecdote)}>vote</button>
          </div>
          <br />
        </div>
      )}
    </div>
  )

}

// Filter to show anecdotes
const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter( a => a.content.toLowerCase().includes( filter.toLowerCase() ) )
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  upVote,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes