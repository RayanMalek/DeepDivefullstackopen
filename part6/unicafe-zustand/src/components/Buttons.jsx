import { useBadStore,useGoodStore,useNeutralStore } from './store'


const Buttons = () => {
  const incrementGood = useGoodStore(state=>state.increment)
  const incrementBad = useBadStore(state=> state.increment)
  const incrementNeutral = useNeutralStore(state=>state.increment)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  )
}

export default Buttons
