import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { Table } from 'semantic-ui-react'

const UserInfo = (props) => {
  if(props.user === undefined) {
    return null
  }

  // stay on user's route and display error if 0 blogs
  if(!props.user.blogs.length) {
    props.history.push('/users')
    props.setNotification({
      text: 'User has no blogs',
      type: 'error'
    }, 7)
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <Table color='blue'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Blogs Added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.user.blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>{blog.title}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user
  }
}

const mapDispatchToProps = {
  setNotification
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo))