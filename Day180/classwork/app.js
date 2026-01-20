const express = require("express")
const dotenv = require("dotenv")
const  globalErrorHandler  = require("./controllers/error.controller")
const appRouter = require("./router/app.router")
dotenv.config()
const app = express()

app.use("/users",appRouter)


app.use(globalErrorHandler)

app.listen(3000,() =>{
    console.log("Server is running")
})
