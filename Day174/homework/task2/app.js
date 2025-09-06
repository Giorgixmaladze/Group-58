const express = require("express")

const dotenv = require("dotenv")
const { hotelRouter } = require("./router/hotel.router")

dotenv.config()

const app = express()
app.use(express.json())
app.use("/hotels",hotelRouter)

app.listen(process.env.PORT,() =>{
    console.log("Server is running")
})