import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from '../components/Comments'
import { Item, Icon, Button } from 'semantic-ui-react'

const Blog = (props) => {
  const blogStyle = {
    marginTop: 30
  }

  if (props.blog === undefined) {
    return null
  }

  const likeStyle = {
    margin: 7
  }

  const updateBlog = blog => {
    try {
      props.likeBlog(blog)
    } catch (error) {
      console.log('Like not saved!')
    }
  }

  const deleteBlog = async id => {
    try {
      if ( window.confirm(`Remove blog: '${props.blog.title}' by ${props.blog.author}`) ) {
        props.removeBlog(id)
        props.setNotification({
          text: 'Blog post successfully removed',
          type: 'success'
        }, 7)

        // redirects to root
        props.history.push('/')
      }
    } catch (exception) {
      props.setNotification({
        text: 'Error: Unable to delete. Unauthorized user',
        type: 'error'
      }, 7)
    }
  }

  // shows remove button to user that added the blog
  const showRemoveBtn = () => {
    if ( props.blog.user.name === props.user.name ) {
      return (
        <Button color='red' onClick={() => deleteBlog(props.blog.id)}>remove</Button>
      )
    }
  }

  const showLikeBtn = () => {
    if ( props.blog.user.name !== props.user.name ) {
      return (
        <Button
          icon
          basic
          color='red'
          size='mini'
          onClick={() => updateBlog(props.blog)}
          style={likeStyle}
        >
          <Icon color='red' name='like' />
        </Button>
      )
    }
  }

  return (
    <div style={blogStyle}>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>
              {props.blog.title} - {props.blog.author}
            </Item.Header>
            <Item.Description>
              <a href={props.blog.url} target='_blank' rel='noopener noreferrer'>{props.blog.url}</a>
            </Item.Description>
            <Item.Extra>
              {props.blog.likes} likes
              {showLikeBtn()}
              <br />
              Added by {props.blog.user.name}
              <br />
              {showRemoveBtn()}
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>

      <Comments blog={props.blog} comments={props.blog.comments} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))