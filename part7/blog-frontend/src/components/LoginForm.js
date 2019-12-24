import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'

const LoginForm = ({
  handleLogin,
  username,
  password
}) => {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          <Icon name='blogger b' />Log-in to your blog account
        </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked>
            <Form.Input id="username" input={{ ...username }} fluid icon='user' iconPosition='left' placeholder='user name' />
            <Form.Input id="password" input={{ ...password }} fluid icon='lock' iconPosition='left' placeholder='password' />
            <Button primary fluid size='large' type='submit'>Login</Button>
          </Segment>

        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm