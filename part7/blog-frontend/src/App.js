import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from './hooks'

import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeBlogUsers } from './reducers/blogUsersReducer'
import { setUser, resetUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

import { Container } from 'semantic-ui-react'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import NavMenu from './components/NavMenu'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = (props) => {
  const containerStyle = {
    width: Math.round(window.innerWidth * 0.65)
  }

  const innerContainerStyle = {
    marginTop: 30
  }

  // For Login
  const username = useField('username')
  const password = useField('password')

  // to avoid es-lint warning and get blogs from DB
  const { initializeBlogs } = props
  useEffect( () => {
    initializeBlogs()
  }, [initializeBlogs])

  // to get bloggers from DB
  const { initializeBlogUsers } = props
  useEffect( () => {
    initializeBlogUsers()
  }, [initializeBlogUsers])

  // For login details
  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

      props.setUser(user)
      username.reset.reset()
      password.reset.reset()
    } catch (exception) {

      props.setNotification({
        text: 'Error: Wrong username or password',
        type: 'error'
      }, 7)

      username.reset.reset()
      password.reset.reset()
    }
  }

  const userById = (id) => props.blogUsers.find(u => u.id === id)
  const blogById = (id) => props.blogs.find( b => b.id === id )

  if (props.user === null) {
    return (
      <Container style={containerStyle}>
        <Container style={innerContainerStyle}>
          <Notification />
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
          />
        </Container>
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <NavMenu />
        <Container style={containerStyle}>
          <Notification />

          <div>
            <Route exact path="/" render={() => <BlogList />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog
                blog={blogById(match.params.id)}
              />
            } />

            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <UserInfo user={userById(match.params.id)} />}
            />
          </div>
        </Container>

      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    blogUsers: state.blogUsers
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeBlogUsers,
  setNotification,
  setUser,
  resetUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)