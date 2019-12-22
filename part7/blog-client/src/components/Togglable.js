import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const Togglable = React.forwardRef((props, ref) => {
  const btnStyle = {
    marginTop: 10,
    marginBottom: 30
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  // A hook to make toggleVisibility function available outside of the component
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button style={btnStyle} primary onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button style={btnStyle} secondary onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable