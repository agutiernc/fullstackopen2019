// Fullstack Open 2019
// Alfonso Gutierrez
import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input { ...username } />
        </div>

        <div>
          Password:
          <input { ...password } />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm