import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, Stack } from '@mui/material'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        blogs
      </Typography>
      <Stack spacing={1}>
        {sortedBlogs.map(blog =>
          <Paper key={blog.id} className="blog" sx={{ p: 2 }} elevation={2}>
            <RouterLink
              to={`/blogs/${blog.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography variant="body1">
                {blog.title} {blog.author}
              </Typography>
            </RouterLink>
          </Paper>
        )}
      </Stack>
    </div>
  )
}

export default BlogList
