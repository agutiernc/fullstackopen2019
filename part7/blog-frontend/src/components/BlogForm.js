import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from '../components/Togglable'
import { Form, Input, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
  const inputStyle = {
    width: 400
  }

  // For new blog post
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const blogFormRef = React.createRef()

  const addBlog = async (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    if (blogObject.title === '' || blogObject.author === '' || blogObject === '') {
      props.setNotification({
        text: 'Please fill all fields',
        type: 'error'
      }, 7)
    } else {
      props.createBlog(blogObject)

      title.reset.reset()
      author.reset.reset()
      url.reset.reset()

      props.setNotification({
        text: `A new blog ${blogObject.title} by ${blogObject.author} added`,
        type: 'success'
      }, 7)

      props.history.push('/')
    }
  }

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <Form onSubmit={addBlog}>
        <Form.Field>
          <label>Title</label>
          <Input id='title' style={inputStyle} size='small' input={{ ...title }} placeholder="Title" />
        </Form.Field>

        <Form.Field>
          <label>Author</label>
          <Input id='author' style={inputStyle} size='small' input={{ ...author }} placeholder="Author" />
        </Form.Field>

        <Form.Field>
          <label>URL</label>
          <Input id='url' style={inputStyle} size='small' input={{ ...url }} placeholder="URL" />
        </Form.Field>
        <Button id='create' primary>create</Button>
      </Form>
    </Togglable >
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default withRouter(connect(null, mapDispatchToProps)(BlogForm))