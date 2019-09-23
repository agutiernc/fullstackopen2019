// Fullstack Open 2019
// Alfonso Gutierrez
import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div>
        <div>
            {blog.title} - {blog.author}
        </div>
        <div>
            blog has {blog.likes} likes
            <button onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog