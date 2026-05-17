import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, render, screen, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'
import AnecdoteList from './components/AnecdoteList'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: 'all' })
  vi.clearAllMocks()
})

describe('anecdote store', () => {
  it('initializes state with anecdotes from the backend', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'first one', votes: 0 },
      { id: 2, content: 'second one', votes: 3 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes)
  })

  it('AnecdoteList renders anecdotes sorted by votes (descending)', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'least popular', votes: 1 },
        { id: 2, content: 'most popular', votes: 10 },
        { id: 3, content: 'middle', votes: 5 },
      ],
      filter: 'all',
    })

    render(<AnecdoteList />)

    const items = screen.getAllByText(/popular|middle/).map(el => el.textContent)
    expect(items).toEqual(['most popular', 'middle', 'least popular'])
  })

  it('useAnecdotes returns a properly filtered list', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'the first anecdote', votes: 0 },
        { id: 2, content: 'the second anecdote', votes: 0 },
        { id: 3, content: 'another first one', votes: 0 },
      ],
      filter: 'first',
    })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toHaveLength(2)
    expect(result.current.every(a => a.content.includes('first'))).toBe(true)
  })

  it('vote increases the vote count for the selected anecdote', async () => {
    const anecdote = { id: 1, content: 'votable', votes: 5 }
    useAnecdoteStore.setState({ anecdotes: [anecdote], filter: 'all' })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 6 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(1)
    })

    expect(useAnecdoteStore.getState().anecdotes[0].votes).toBe(6)
  })
})
