const express = require("express")

const app = express()

const {usersRouter} = require("./router/users.router")
const {postsRouter} = require("./router/posts.router")
app.use(express.json())

app.use("/users",usersRouter)

app.use("/posts",postsRouter)

app.listen(3000, () =>{
    console.log("Server is running")
})