// Fullstack Open 2019
// Alfonso Gutierrez
import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  // For new blog post
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  // For Login
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)

  // for displaying login form or not
  const [loginVisible, setLoginVisible] = useState(false)

  // For notifications (error or not)
  const [message, setMessage] = useState( { text: null, type: null } )

  const blogFormRef = React.createRef()

  // grabs data from DB using blogService
  useEffect( () => {
    blogService
      .getAll()
      .then( initialBlogs => setBlogs(initialBlogs) )
  }, [])

  // For login details
  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    try {
      event.preventDefault()

      blogFormRef.current.toggleVisibility()

      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }

      const savedBlog = await blogService.create(blogObject)

      savedBlog.user = { name: user.name } // returns the user that added blog

      setBlogs( blogs.concat(savedBlog) )
      setMessage({
        text: `A new blog ${ savedBlog.title } by ${ savedBlog.author } added`,
        type: 'success'
      })
      setTimeout(() => {
        setMessage({ text: null, type: null })
      }, 5000)

      title.reset.reset()
      author.reset.reset()
      url.reset.reset()
    } catch (exception) {
      setMessage({
        text: 'Please fill all fields',
        type: 'error'
      })
      setTimeout(() => {
        setMessage({ text: null, type: null })
      }, 5000)
    }
  }

  // Displays blogs
  const rows = () => blogs.sort( (a, b) => b.likes - a.likes ).map( blog =>
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={ () => updateBlog(blog.id) }
      handleRemove={ () => removeBlog(blog.id) }
      user={user}
    />
  )

  const updateBlog = async id => {
    try {
      const blog = blogs.find(b => b.id === id)
      const updateLike= { ...blog, likes: blog.likes + 1 }

      await blogService.update(updateLike)

      const updatedBlog = { ...updateLike, user: blog.user }

      setBlogs( blogs.map( b => b.id !== id ? b : updatedBlog)  )
    } catch (error) {
      console.log('Like not saved!')
    }
  }

  const removeBlog = async id => {
    try {
      const blog = blogs.find( b => b.id === id )

      if ( window.confirm(`Remove blog: '${blog.title}' by ${blog.author}`) ) {
        await blogService.destroy(id)

        setBlogs( blogs.filter( b => b.id !== id ) )

        setMessage({
          text: 'Blog post successfully removed',
          type: 'success'
        })
        setTimeout( () => {
          setMessage({ text: null, type: null })
        }, 5000)
      }
    } catch (exception) {
      setMessage({
        text: 'Unable to delete. Unauthorized user.',
        type: 'error'
      })
      setTimeout( () => {
        setMessage({ text: null, type: null })
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={ () => setLoginVisible(true) }>log in</button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
          />
          <button onClick={ () => setLoginVisible(false) }>cancel</button>
        </div>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login( {
        username: username.value,
        password: password.value
      })

      // saves login details to localStorage so user info stays on reloads
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user) )

      blogService.setToken(user.token)

      setUser(user)

      username.reset.reset()
      password.reset.reset()
    } catch (exception) {
      setMessage( { text: 'Wrong username or password', type: 'error' } )
      setTimeout( () => {
        setMessage( { text: null, type: null } )
      }, 5000)
      username.reset.reset()
      password.reset.reset()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    
    setUser(null)
  }

  if ( user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />
        { loginForm() }
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <h3>Create New Blog</h3>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            addBlog={addBlog}
            author={author}
            title={title}
            url={url}
          />
        </Togglable>

        <h3>Blog List</h3>
        { rows() }
      </div>
    </div>
  )
}

export default App
