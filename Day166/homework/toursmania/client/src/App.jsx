import { useState } from "react"
import { useEffect } from "react"



function App() {
  const [tours, setTours] = useState([])
  const [add, setAdd] = useState(false)
  const [change, setChange] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://localhost:8000/tours")
        res = await res.json()
        setTours(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])



  const addTour = () => {
    setAdd(true)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTour = {
      id: tours.length + 2,
      name: e.target.tourName.value,
      description: e.target.description.value,

    };

    try {
      const res = await fetch("http://localhost:8000/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour)
      });
      const savedTour = await res.json();
      setTours(prev => [...prev, savedTour]);
      setAdd(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTour = async (id) => {

    try {
      const res = await fetch(`http://localhost:8000/tour?id=${id}`, {
        method: "DELETE",
      });
      const saved = await res.json()
      setTours(saved)
    } catch (err) {
      console.log(err)
    }
  }

  const cancelAdd = () => {
    setAdd(false)
  }

  const changing = () => {
    setChange(true)
  }
  const cancelChange = () => {
    setChange(false)
  }

  const saveChange = async (e, id) => {
  e.preventDefault();

  const info = {
    name: e.target.tourName.value,
    description: e.target.desc.value, 
  };

  try {
    const res = await fetch(`http://localhost:8000/tour?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    const updatedTour = await res.json();

    setTours(prev =>
      prev.map(t => (t.id === id ? updatedTour : t)) 
    )
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <h1>Tours List</h1>
      {
        add ? (
          <form onSubmit={handleSubmit}>
            <input type="text" name="tourName" placeholder="type a tour name" />
            <textarea name="description" placeholder="type a description" id="" />
            <button>Submit</button>
            <button onClick={cancelAdd}>Cancel</button>
          </form>
        ) : (<button onClick={addTour}>add tour</button>)
      }

      <ul>
        {tours.map((tour, index) => (
          change ? (
            <li>
              <form onSubmit={(e) => saveChange(e, tour.id)} action="" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input type="text" defaultValue={tour.name} name="tourName" />
                <textarea name="desc" defaultValue={tour.description} id=""></textarea>
                <input type="number" name="price" defaultValue={tour.price} />
                <button>Save</button>
                <button onClick={cancelChange}>Cancel</button>
              </form>
            </li>
          ) : (
            <li key={tour.id}>
              <h2>{tour.name}</h2>
              <p>{tour.description}</p>
              <p>Price: ${tour.price}</p>
              <button onClick={() => deleteTour(tour.id)}>delete</button>
              <button onClick={changing}>change</button>
            </li>
          )
        ))}
      </ul>
    </div>
  )
}

export default App
