const express = require("express")

const morgan = require("morgan")


const app = express()


app.use(morgan("combined"))

app.get("/",(req,res) =>{
    res.send("Hello")
})

app.listen(3000,() =>{
    console.log("server is running")
})