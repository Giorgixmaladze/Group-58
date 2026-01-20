import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://localhost:3000/cars")
        res = await res.json()
        setData(res)
       
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }
    fetchData()
  }, [])
  
  return (
    <>
      {data.map((car, idx) => (
        <div key={idx}>
          <h2>{car.brand}</h2>
          <p>{car.model}</p>
        </div>
      ))}
    </>
  )
}

export default App