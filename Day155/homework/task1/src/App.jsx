import { useState } from 'react'
import MyText from './Components/MyText'

function App() {
  const [count,setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count+1)}>+1</button>
      <p>{count}</p>
      <MyText />
    </>
  )
}

export default App
