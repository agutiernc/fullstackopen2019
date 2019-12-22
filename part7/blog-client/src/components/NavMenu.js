import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { resetUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Menu, Button, Icon } from 'semantic-ui-react'

const NavMenu = (props) => {
  const [activeItem, setActiveItem] = useState('blogs')

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    props.history.push('/')
    props.resetUser()

    props.setNotification({
      text: 'You have successfully logged out',
      type: 'success'
    }, 5)

  }

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return (
    <Menu> 
      <Menu.Item
        as={ Link }
        to="/"
        name='blogs'
        active={activeItem === 'blogs'}
        onClick={handleItemClick}
      >
        blogs
      </Menu.Item>
      
      <Menu.Item
        as={ Link }
        to="/users"
        name='users'
        active={activeItem === 'users'}
        onClick={handleItemClick}
      >
        users
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item
          name='user'
        >
          <Icon name='user' />{props.user.name} logged in
      </Menu.Item>

        <Menu.Item
          name='logout'
        >
          <Button basic color='blue' onClick={handleLogout}><Icon name='log out' /> logout</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  resetUser,
  setNotification
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(NavMenu) )