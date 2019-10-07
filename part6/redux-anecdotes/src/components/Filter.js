// Fullstack Open - 2019
// Alfonso Gutierrez
import React from 'react'
import { connect } from 'react-redux'
import { setFilterAnecdote } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginTop: 20,
    marginBottom: 15,
    fontWeight: 700
  }

  const handleChange = (event) => {
    const content = event.target.value

    props.setFilterAnecdote(content)
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, {setFilterAnecdote} )(Filter)