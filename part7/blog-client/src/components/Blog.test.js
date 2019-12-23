import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

// afterEach(cleanup)

describe('<Blog />', () => {
  const blog = {
    title: 'Introducing the New React DevTools',
    author: 'Brian Vaughn',
    likes: 5,
    url: 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html',
    id: 1,
    user: {
      name: 'Peter Parker',
      username: 'Spider-Man',
      id: 2
    }
  }

  const user = {
    name: 'Peter Parker'
  }

  test('only name and author are shown by default', () => {
    const component = render (
      <Blog blog={blog} user={user} />
    )

    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'Introducing the New React DevTools - Brian Vaughn'
    )

    expect(div).toHaveStyle('')
  })

  test('when blog post is clicked, other info displays', () => {
    const component = render (
      <Blog blog={blog} user={user} />
    )
    
    const div = component.container.querySelector('.blog')

    fireEvent.click(div)

    const divHidden = component.container.querySelector('.blogInfo')

    expect(divHidden).not.toHaveStyle('display: none')
  })

})