// Fullstack Open 2019
// Alfonso Gutierrez
import React from 'react'

const Notification = ({ message }) => {
  let mainMsgStyle = null

  const msgStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message.text === null) {
    return null
  }

  if (message.type === 'success') {
    mainMsgStyle = { ...msgStyle, color: 'green' }
  } else {
    mainMsgStyle = { ...msgStyle, color: 'red' }
  }

  return (
    <div style={mainMsgStyle}>
      {message.text}
    </div>
  )
}

export default Notification