import { useState } from "react"
import { useEffect } from "react"



function App() {
  const [tours,setTours] = useState([])
  useEffect(() =>{
    const fetchData = async () =>{
      try{
        let res = await fetch("http://localhost:3000/tours")
        res = await res.json()
        setTours(res)
      }catch(err){
        console.error(err)
      }
    }
    fetchData()
  },[])
 

  return(
    <div>
      <h1>Tours List</h1>
      <ul>
        {tours.map(tour => (
          <li key={tour.id}>
            <h2>{tour.name}</h2>
            <p>{tour.description}</p>
            <p>Price: ${tour.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
