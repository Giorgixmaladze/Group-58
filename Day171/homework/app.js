const express = require("express")
const { postRouter } = require("./router/posts.router")

const app = express() 

app.use("/posts",postRouter)

app.listen(3000,() =>{
    console.log("Server is running")
})