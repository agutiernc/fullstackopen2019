// Fullstack Open 2019 - Part 4
// Alfonso Gutierrez

// Handles the event handlers of blog routes
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Route 1 - gets all blogs in MongoDB
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})

    response.json( blogs.map( blog => blog.toJSON() ) )
})

// Route 2 - gets an object id
blogsRouter.get('/:id', (request, response, next) => {

    Blog
        .findById(request.params.id)
        .then(blog => {
            blog ? response.json( blog.toJSON() ) : response.status(404).end()
        })
        .catch(error => next(error))
})

// Route 3 - POST blog
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id ) {
            return response.status(401).json( {error: 'token missing or invalid'} )
        }

        if (!body.title || !body.author || !body.url) {
            return response.status(400).json({ error: 'title, author, or likes is missing' })
        }

        // user that creates the blog
        const user = await User.findById( decodedToken.id )

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })


        const savedBlog = await blog.save()

        // new blog is assigned to user that created it
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json( savedBlog.toJSON() )
    } catch (exception) {
        next(exception)
    }
})

//route 4 - Delete an id
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        
        if (!request.token || !decodedToken.id) {
            return response.status(401).json( { error: 'token missing or invalid' } )
        }

        // user that wants to delete the blog
        const user = await User.findById( decodedToken.id )

        // blog to delete
        const blog = await Blog.findById( request.params.id )
        
        if ( blog.user.toString() !== user.id.toString() ) {
            return response.status(403).json( {error: 'Unauthorized: Blog belongs to another user'} )
        }

        await Blog.findByIdAndRemove( request.params.id )

        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

// route 5 - PUT - Fetches and updates a blog
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        await Blog.findByIdAndUpdate( request.params.id, blog, { new: true } )

        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter