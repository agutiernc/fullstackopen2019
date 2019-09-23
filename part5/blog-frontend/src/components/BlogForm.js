// Fullstack Open 2019
// Alfonso Gutierrez
import React from 'react'

const BlogForm = ({ addBlog, title, author, url }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <br />
        Title: <input { ...title } />
        <br />
        Author: <input { ...author } />
        <br />
        URL: <input { ...url } />
      </div>

      <button>create</button>
    </form>
  )
}

export default BlogForm