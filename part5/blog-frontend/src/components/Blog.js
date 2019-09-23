// Fullstack Open 2019
// Alfonso Gutierrez
import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: 'purple'
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  // shows remove button to user that added the blog
  const showRemoveBtn = () => {
    if ( blog.user.name === user.name ) {
      return (
        <button onClick={handleRemove}>remove</button>
      )
    }
  }

  // Shows like button to user that didn't add blog
  const showLikeBtn = () => {
    if ( blog.user.name !== user.name ) {
      return (
        <button onClick={handleLike}>like</button>
      )
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} className='blog'>
        {blog.title} - {blog.author}
      </div>
      <div style={showWhenVisible} onClick={toggleVisibility} className='blogInfo'>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
        <br />
        {blog.likes} likes
        { showLikeBtn() }
        <br />
        Added by {blog.user.name}
        <br />
        { showRemoveBtn() }
      </div>
    </div>
  )
}

export default Blog