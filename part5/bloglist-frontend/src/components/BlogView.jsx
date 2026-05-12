import { useParams, useNavigate } from 'react-router-dom'
import {
  Card, CardContent, CardActions, Button, Typography, Box, Stack
} from '@mui/material'

const BlogView = ({ blogs, user, updateBlog, deleteBlog }) => {
  const id = useParams().id
  const navigate = useNavigate()
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = async () => {
    await deleteBlog(blog)
    navigate('/blogs')
  }

  const canDelete = user && blog.user && blog.user.username === user.username

  return (
    <Card sx={{ maxWidth: 640, mx: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>
        <Box sx={{ my: 1 }}>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <Typography>{blog.likes} likes</Typography>
          {user && (
            <Button size="small" variant="outlined" onClick={handleLike}>
              like
            </Button>
          )}
        </Stack>
        <Typography variant="body2" sx={{ mt: 2 }}>
          added by {blog.user.name}
        </Typography>
      </CardContent>
      {canDelete && (
        <CardActions>
          <Button color="error" variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default BlogView
