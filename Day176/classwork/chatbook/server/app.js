const express = require("express")

const morgan = require("morgan")

const dotenv = require("dotenv")

const mongoose = require("mongoose")
const postRouter = require("./router/posts.router")

dotenv.config()

const app = express()
app.use(express.json())


app.use("/posts",postRouter)

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}




mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to MongoDB")

        app.listen(process.env.PORT, () => {
            console.log("Server is running")
        })

    }).catch(err=>{
        console.error(err)
        process.exit(1)
    })



