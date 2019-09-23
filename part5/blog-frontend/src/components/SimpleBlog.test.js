// Fullstack Open 2019
// Alfonso Gutierrez
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Introducing the New React DevTools',
    author: 'Brian Vaughn',
    likes: 5
  }

  const component = render (
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Introducing the New React DevTools'
  )

  expect(component.container).toHaveTextContent(
    'Brian Vaughn'
  )

  expect(component.container).toHaveTextContent(5)
  
})

test('clicking the button calls event handler twice', () => {
  const blog = {
    title: 'Introducing the New React DevTools',
    author: 'Brian Vaughn',
    likes: 5
  }

  // mock event handler
  const mockHandler = jest.fn()

  const { getByText } = render (
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  
  // fires twice (clicks)
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})