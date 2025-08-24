const express = require("express")

const fs = require("fs")

const app = express()

let tours = JSON.parse(fs.readFileSync("./tours.json"))
// შექმენით tours API - უნდა შეგეძლოთ tours - ების შეცვლა, დამატება, წაშლა და წამოღება put, get, delete, post - მეთოდებით 

app.get("/tours",(req,res) =>{
    res.json(tours)
})

app.post("/tours",express.json(),(req,res) =>{
    const newTour = {
        id:tours.length + 1,
        ...req.body
    }
    tours.push(newTour)
    fs.writeFileSync("./tours.json",JSON.stringify(tours))
})


app.put("/tours/:id", express.json(), (req, res) => {
  const { id } = req.params;
  const index = tours.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Tour not found" });
  }

  tours[index] = { id: parseInt(id), ...req.body };
  fs.writeFileSync("./tours.json", JSON.stringify(tours));
  res.json(tours[index]);
});



app.delete("/tours/:id",(req,res) =>{
    const {id} = req.params

    const filtered = tours.filter(tour => tour.id !== parseInt(id))

    fs.writeFileSync("./tours.json",JSON.stringify(filtered))
    
    
})


app.listen(3000,() =>{
    console.log("Server is running")
})