import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
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

    props.addComment(props.blog, content)
    comment.reset.reset()
    props.history.push(`/blogs/${props.blog.id}`)
  }

  return (
    <div>
      <h3>Comments</h3>
      <Form onSubmit={newComment}>
        <Form.Field>
          <Input style={inputStyle} input={{...comment}} placeholder='your comment' />
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
  addComment
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))