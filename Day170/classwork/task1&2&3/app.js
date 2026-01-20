const express = require("express")


const app = express()


const {toursRouter} = require("./router/tours.router.js")

app.use("/tours",toursRouter)

app.listen(3000,() => {
    console.log("Server is running")
})
