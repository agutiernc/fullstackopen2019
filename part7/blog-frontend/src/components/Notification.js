import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  let mainMsgStyle = null

  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notification = props.notification

  if (notification !== null) {
    if (notification.type === 'success') {
      mainMsgStyle = { ...style, color: 'green' }
    } else {
      mainMsgStyle = { ...style, color: 'red' }
    }

    return (
      <div style={mainMsgStyle}>
        {notification.text}
      </div>
    )
  }

  return (
    <div></div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)