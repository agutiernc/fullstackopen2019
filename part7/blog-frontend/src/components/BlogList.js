import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import { Icon } from 'semantic-ui-react'

const BlogList = (props) => {

  const blogStyle = {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 5,
    borderColor: 'purple'
  }

  return (
    <>
      <h1>Blogs</h1>
      <h3>Create New Blog</h3>
      <BlogForm />
      {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <div className='blog'>
            <Link to={`/blogs/${blog.id}`}><Icon name='book' />{blog.title} - {blog.author}</Link>
          </div>
        </div>
      )}
    </>

  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps, null)(BlogList)
