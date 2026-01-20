const express = require("express")
const { postRouter } = require("./router/posts.router")

const app = express() 
app.use(express.json()) 

app.use("/posts",postRouter)

app.listen(3000,() =>{
    console.log("Server is running")
})