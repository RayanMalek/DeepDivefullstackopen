import { useAnecdoteActions } from '../store'

const VisibilityFilter = () => {
  const { setFilter } = useAnecdoteActions()

  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('all')}
        defaultChecked
      />
      all
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('first')}
      />
      first
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('second')}
      />
      second
    </div>
  )
}

export default VisibilityFilter