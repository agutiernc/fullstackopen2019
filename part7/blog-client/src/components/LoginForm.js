import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon} from 'semantic-ui-react'

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
            <Form.Input input={{ ...username }} fluid icon='user' iconPosition='left' placeholder='user name' />
            <Form.Input input={{ ...password }} fluid icon='lock' iconPosition='left' placeholder='password' type='password' />
            <Button primary fluid size='large' type='submit'>Login</Button>
          </Segment>

        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm