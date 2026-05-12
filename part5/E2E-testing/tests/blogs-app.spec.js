const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'malek',
        password: 'rayan'
      }
    })
    await page.goto('http://localhost:5173')
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('malek')
      await page.getByLabel('password').fill('rayan')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('zebi')
      await page.getByLabel('password').fill('rayan')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('malek')
      await page.getByLabel('password').fill('rayan')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('link', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('a blog created by playwright')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByRole('link', { name: /a blog created by playwright/ })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('link', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('a blog to be liked')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('link', { name: /a blog to be liked/ }).click()
      await expect(page.getByText('0 likes')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await page.getByRole('link', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('a blog to be deleted')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('link', { name: /a blog to be deleted/ }).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'Delete' }).click()

      await expect(page.getByRole('link', { name: /a blog to be deleted/ })).not.toBeVisible()
    })
  })
})
