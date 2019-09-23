// Fullstack Open 2019
// Alfonso Gutierrez

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Creating a blog',
        author: 'Peter Parker',
        url: 'makeblogs.com',
        likes: 16
    },
    {
        title: 'Beating up Batman',
        author: 'Joker',
        url: 'hahaha.com',
        likes: 50
    }
]

const nonExistingId = async () => {
    const blog = new Blog( {
        title: 'willremovethissoon',
        author: 'willremovethissoon',
        url: 'willremovethissoon',
        likes: 'willremovethissoon'
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

// used to check the blogs in the DB
const blogsInDb = async () => {
    const blogs = await Blog.find({})

    return blogs.map( blog => blog.toJSON() )
}

// helps to verify the state of the DB after a user is created
const usersInDb = async () => {
   const users = await User.find({})

   return users.map( u => u.toJSON() )
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }