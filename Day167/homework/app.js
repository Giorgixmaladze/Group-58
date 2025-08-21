const express = require("express")
const fs = require("fs")
const app = express()


app.get("/cars",(req,res) =>{
    res.end(fs.readFileSync("./cars.json"))
})

app.listen(3000,()=>{
    console.log("Server is running")
})