import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props,ref) => {
  const [formVisible, setFormVisible] = useState(false)
  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  const toggableVisibility = () => {
    setFormVisible(!formVisible)
  }
  console.log(props.btn)
  useImperativeHandle(ref, () => {
    return{
      toggableVisibility
    }
  })
  return (
    <>
      <div style={ hideWhenVisible }>
        <button onClick={toggableVisibility}>{props.btn}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggableVisibility}>cancel</button>
      </div>
    </>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable