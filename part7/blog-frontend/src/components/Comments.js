import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { List, Input, Form, Button } from 'semantic-ui-react'

const Comments = (props) => {
  const btnStyle = {
    marginTop: 10,
    marginBottom: 30
  }

  const inputStyle = {
    width: 400,
    marginRight: 10
  }

  const comment = useField('comment')

  const newComment = (event) => {
    event.preventDefault()

    const content = comment.value

    if (content === '') {
      props.setNotification({
        text: 'Comment is too short or must be filled',
        type: 'error'
      }, 7)
    } else {
      props.addComment(props.blog, content)
      props.setNotification({
        text: 'Thanks for commenting',
        type: 'success'
      }, 7)
      comment.reset.reset()

      props.history.push(`/blogs/${props.blog.id}`)
    }
  }

  return (
    <div>
      <h3>Comments</h3>
      <Form onSubmit={newComment}>
        <Form.Field>
          <Input style={inputStyle} input={{ ...comment }} placeholder='your comment' />
          <Button style={btnStyle} primary>add comment</Button>
        </Form.Field>
      </Form>

      <div>
        <List>
          {
            props.comments.map(comment =>
              <List.Item key={comment.id}>
                <List.Icon name='comment outline' />
                <List.Content>{comment.message}</List.Content>
              </List.Item>
            )
          }
        </List>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    comments: ownProps.comments
  }
}

const mapDispatchToProps = {
  addComment,
  setNotification
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))