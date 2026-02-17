import { useState } from 'react'

function App() {

  const [image,setImage] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image",image)
    const response = await fetch("http://localhost:3000/upload/img",{
      method:"POST",
      body:formData
    })

  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>

        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    
      <img src={URL.createObjectURL(image)} alt="" />
    </>

      
  )
}

export default App
