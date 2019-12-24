import React from 'react'
import { render, waitForElement, wait } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  test('If no user logged in, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')

    const blogs = component.container.querySelector('.blogs')
    expect(blogs).not.toBeInTheDocument()
  })

  test('If user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('logout')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(2)
  })

})