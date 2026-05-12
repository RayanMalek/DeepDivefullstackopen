import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        create new
      </Typography>
      <form onSubmit={addBlog}>
        <TextField
          label="title"
          value={newTitle}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="author"
          value={newAuthor}
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="url"
          value={newUrl}
          onChange={({ target }) => setUrl(target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          create
        </Button>
      </form>
    </Box>
  )
}

export default BlogForm
