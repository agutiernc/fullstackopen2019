// Fullstack Open 2019
// Alfonso Gutierrez

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

// initializes the DB before every test
beforeEach( async () => {
    await Blog.deleteMany({}) // Clears DB at start

    const blogObjects = helper.initialBlogs.map( blog => new Blog(blog) )

    const promiseArray = blogObjects.map( blog => blog.save() )

    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blog posts', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body.length).toBe(2)
    })

})

describe('id property exists', () => {

    test('unique identifier property of the blog posts is named id', async() => {
        const response = await api.get('/api/blogs')
    
        const ids = response.body.map( r => r.id )
    
        expect(ids).toBeDefined()
    })

})

describe('addition of a new blog', () => {

    test('a vaid blog post can be added', async () => {
        const newBlog = {
            title: 'Making Web Slings',
            author: 'Spider-Man',
            url: 'spidey.com',
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
       const blogsAtEnd = await helper.blogsInDb()
    
       // verifies total num of blogs is increased by 1 and confirms new post
       expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    
       // confirms content was added correctly
       const contents = blogsAtEnd.map( b => b.title )
    
       expect(contents).toContain('Making Web Slings')
    })

})

describe('dealing with missing properties', () => {

    test('if likes property is missing when posting, default to 0', async () => {
        const newBlog = {
            title: 'Leap Tall Buildings',
            author: 'Superman',
            url: 'super.com',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        const likes = blogsAtEnd.map( b => b.likes )
    
        expect(likes[2]).toEqual(0)
    })

    test('missing title and url returns 400 request', async () => {
        const newBlog = {
            author: 'Wolverine',
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

})

// Optional Test
describe('deletion of a blog post', () => {

    test('a blog post is deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe( helper.initialBlogs.length - 1 )

        const titles = blogsAtEnd.map( r => r.title )
        
        expect(titles).not.toContain( blogToDelete.title )
    })

})

describe('when there is initially one user at db', () => {
    // clears the DB and adds a user
    beforeEach(async () => {
        await User.deleteMany({})

        const user = new User( { username: 'root', password: 'secret' } )

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'batman',
            name: 'Bruce Wayne',
            password: 'harley123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe( usersAtStart.length + 1 )

        const usernames = usersAtEnd.map( u => u.username )
        expect(usernames).toContain( newUser.username )

    })

    test('creation fails with proper statuscode and message if username already taken', async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'supasupa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect( usersAtEnd.length ).toBe( usersAtStart.length )

    })

})

describe('proper errors for user and password requirements', () => {

    test('username is not missing', async () => {
        const newUser = {
            username: '',
            name: 'The Joker',
            password: 'hahaha'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('`username` is required')
    })

    test('password is not missing', async () => {
        const newUser = {
            username: 'batman',
            name: 'Bruce Wayne',
            password: ''
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('minimum length of required password is 3 characters long')
    })

    test('verify if username is less than 3 characters', async () => {
        const newUser = {
            username: 'wo',
            name: 'Logan',
            password: 'claws'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')
    })

    test('verify if password is less than 3 characters', async () => {
        const newUser = {
            username: 'wolverine',
            name: 'Logan',
            password: 'cl'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('minimum length of required password is 3 characters long')
    })
})

// Optional test - run test by itself to avoid conflict from other tests
describe('Verify working put requests', () => {

    test('verify a like has updated', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
    
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                title: "Creating a blog",
                author: "Peter Parker",
                url: "makeblogs.com",
                likes: 69
            })
            .expect(204)
    })

})

afterAll( () => mongoose.connection.close() )