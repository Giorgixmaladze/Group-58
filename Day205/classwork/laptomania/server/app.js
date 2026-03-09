const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns")
const app = express()
app.use(cors());
dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

mongoose.connect(process.env.DB_URL)
    .then(() =>{
        console.log("connected to MongoDB!")

        app.use(process.env.PORT, () =>{
            console.log(`App running at port ${process.env.PORT}`)
        })
    });


