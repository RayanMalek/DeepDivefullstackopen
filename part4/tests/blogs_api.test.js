const { test, after,beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')



const api = supertest(app)
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('all blogs are returned as json', async () => {
  const response= await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/) 
    assert.strictEqual(response.body.length, initialBlogs.length)

})

test(' a new blog can be added',async()=>{
  const newBlog ={
     title: 'Omek thoma Omek',
    author: 'Gattouz ',
    url: 'https://reactpatterns.com/',
    likes: 99
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r=>r.title)

  assert.strictEqual(response.body.length,initialBlogs.length+1)

  assert(contents.includes('Omek thoma Omek'))


})

test('a specific blog can be viewed',async()=>{
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog= await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)

    
})

test('deletion of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('likes of a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updated = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 100,
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updated)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 100)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedInDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.strictEqual(updatedInDb.likes, blogToUpdate.likes + 100)
})

after(async () => {
  await mongoose.connection.close()
})
