import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('the form calls the event handler it received as props with the right details when a new blog is created' , async () => {

  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockHandler}  />)

  const inputs = screen.getAllByRole('textbox')
  // inputs[0] = title, inputs[1] = author, inputs[2] = url
  await user.type(inputs[0], 'testing a form...')
  await user.type(inputs[1], 'Tester McTest')
  await user.type(inputs[2], 'https://example.com/test')
  await user.click(screen.getByText('create'))

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: 'testing a form...',
    author: 'Tester McTest',
    url: 'https://example.com/test',
  })

})