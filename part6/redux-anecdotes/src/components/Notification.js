// Fullstack Open - 2019
// Alfonso Gutierrez
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20
  }

  const notification = props.notification
  
  if (notification !== null) {
    return (
      <div style={style}>
        {notification}
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