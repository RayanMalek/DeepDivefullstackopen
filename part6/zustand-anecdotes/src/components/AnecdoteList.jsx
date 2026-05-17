

import { useAnecdotes,useAnecdoteActions, useNotificationActions } from '../store'


const AnecdoteList =()=>{
    const anecdotes = useAnecdotes()
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
    const { vote, remove } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()

    const handleVote = async (anecdote) => {
      await vote(anecdote.id)
      setNotification(`you voted '${anecdote.content}'`)
    }

    const handleRemove = async (anecdote) => {
      await remove(anecdote.id)
      setNotification(`deleted '${anecdote.content}'`)
    }

    return (
    <div>
     {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleRemove(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
    )
}

export default AnecdoteList