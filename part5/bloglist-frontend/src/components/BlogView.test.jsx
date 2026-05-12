import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogView from './BlogView'

const blog = {
  id: '123',
  title: 'Component testing is done with react-testing-library',
  author: 'Kalle Ilves',
  url: 'https://example.com/component-testing',
  likes: 7,
  user: { username: 'creator', name: 'The Creator' }
}

const renderBlogView = (extraProps) => {
  render(
    <MemoryRouter initialEntries={['/blogs/123']}>
      <Routes>
        <Route path="/blogs/:id" element={
          <BlogView blogs={[blog]} {...extraProps} />
        } />
      </Routes>
    </MemoryRouter>
  )
}

test('unauthenticated user sees the blog info and likes but no buttons', () => {
  renderBlogView({ user: null })

  expect(screen.getByText(blog.title, { exact: false })).toBeDefined()
  expect(screen.getByText(blog.author, { exact: false })).toBeDefined()
  expect(screen.getByText('7 likes', { exact: false })).toBeDefined()

  expect(screen.queryByRole('button', { name: 'like' })).toBeNull()
  expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull()
})

test('authenticated user who is not the creator sees only the like button', () => {
  renderBlogView({ user: { username: 'someone-else', name: 'Other' } })

  expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
  expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull()
})

test('the blog creator also sees the delete button', () => {
  renderBlogView({ user: { username: 'creator', name: 'The Creator' } })

  expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
  expect(screen.getByRole('button', { name: 'Delete' })).toBeDefined()
})
