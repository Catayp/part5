import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: "lala",
    author: "tttt",
    url: "osahdopa",
    likes: 2
  }
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })
  test('renders content', () => {
    const li = component.container.querySelector('li')
    expect(li).toHaveTextContent(`${blog.title} - ${blog.author}`)
    expect(li).not.toHaveTextContent(blog.url)
    expect(li).not.toHaveTextContent(blog.likes)
  })
})
