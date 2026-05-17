import { create } from 'zustand'
import anecdoteService from'./services/anecdotes'

const useAnecdoteStore = create((set,get) => ({
  anecdotes: [],
  filter : 'all',
  actions: {
    vote : async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes+1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(n => n.id === id ? updated : n)
      }))
    },
    add: async (content)=>{
      const newAnecdote = await anecdoteService.createNew(content)
       set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter : value=>set(()=>({filter:value})),
    initialize : async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(n => n.id !== id) }))
    },
  },
}))
export const useAnecdotes = () =>{
  const anecdotes = useAnecdoteStore((state)=> state.anecdotes)
  const filter = useAnecdoteStore((state)=>state.filter)
  if (filter==='first') return anecdotes.filter(n=>n.content.includes('first'))
  if (filter==='second') return anecdotes.filter(n=>n.content.includes('second'))
  return anecdotes
}


let notificationTimeout = null

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setNotification: (message) => {
      set(() => ({ notification: message }))
      clearTimeout(notificationTimeout)
      notificationTimeout = setTimeout(() => {
        set(() => ({ notification: '' }))
      }, 5000)
    },
  },
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore
