import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import {
  AppBar, Toolbar, Button, Container, Typography, Box
} from '@mui/material'
import blogService from './services/blogs'
import loginService from './services/login'
import Home from './components/Home'
import Footer from './components/Footer.jsx'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList.jsx'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const createBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    const blogWithUser = {
      ...returnedBlog,
      user: { username: user.username, name: user.name, id: returnedBlog.user }
    }
    setBlogs(blogs.concat(blogWithUser))
    navigate('/blogs')
  }

  const updateBlog = async (updatedBlog) => {
    const returned = await blogService.update(updatedBlog)
    setBlogs(blogs.map(b => b.id === returned.id ? returned : b))
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    setUser(null)
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Notification message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Container>
    )
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">home</Button>
          <Button color="inherit" component={Link} to="/blogs">blogs</Button>
          <Button color="inherit" component={Link} to="/create">new blog</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{ mr: 2 }}>
            {user.name} logged in
          </Typography>
          <Button color="inherit" onClick={handleLogout}>logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Notification message={errorMessage} />

        <Routes>
          <Route path="/blogs" element={<BlogList blogs={blogs} />} />
          <Route path="/blogs/:id" element={
            <BlogView
              blogs={blogs}
              user={user}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          } />
          <Route path="/create" element={<BlogForm createBlog={createBlog} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>

      <Footer />
    </div>
  )
}

export default App
