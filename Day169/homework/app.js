// შექმენით online მაღაზიის API, უნდა შეგეძლოთ ახალი პროდუქტების დამატება, წაშლა, არსებული მონაცემების განახლება (post, delete, patch, get),  მომხმარებელს უნდა შეეძლოს პროდუქტების ფასის მიხედვით დალაგება (ზრდადობის მიხედვით, კლებადობის მიხედვით), იმ შემთხვევაში თუ საძიებელ სიტყვაში იყო მოცემული limit - ი მაშინ limit - რება გააკეთეთ პროდუქტების მასივზე. გატესტეთ მუშაობა Postman - ის გამოყენებით



const express = require("express");

const fs = require("fs")

const app = express()

const products = JSON.parse(fs.readFileSync("./products.json"))



app.get("/products",(req,res) =>{
    const {sort,limit} = req.query

    const sorted = [...products]


    if(limit){
        sorted.splice(limit, products.length - limit)
    }
    if(sort === "price"){
        sorted.sort((a,b) => a.price - b.price)
    }else if(sorted === "-price"){
        sorted.sort((a,b) => b.price - a.price)
    }
    res.json(sorted)
})

app.post("/products",express.json(), (req,res) =>{
    const product =  {
        id:products.length + 1,
        ...req.body
    }

    products.push(product)
    fs.writeFileSync("./products.json",JSON.stringify(products))
    res.json(product)
})

app.patch("/products/:id", express.json(), (req,res) =>{
    const {id} = req.params

    const product = products.findIndex(item => item.id === parseInt(id))

    if(product === -1){
        return res.status(404).json({message:"Product not found"})
    }
    products[product] ={
        id:id,
        ...req.body
    }
    fs.writeFileSync("./products.json",JSON.stringify(products))
    res.json(products[product])
})


app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(item => item.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  
  products.splice(productIndex, 1);


  fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));

  res.json({ message: "Product deleted successfully" });
});


app.listen(8000,()=>{
    console.log("Server is running")
})