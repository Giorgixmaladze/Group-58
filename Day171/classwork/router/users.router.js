const express = require("express")
const {getAllUsers, getSingleUser, addUser, login} = require("../controllers/users.controls")

const usersRouter = express.Router()


usersRouter.get("/",(req,res) =>{
    getAllUsers(req,res)
})


usersRouter.get("/:id",(req,res) =>{
    getSingleUser(req,res)
})


usersRouter.post("/register",(req,res) =>{
    addUser(req,res)
})


usersRouter.post("/login",(req,res) =>{
    login(req,res)
})
module.exports = {usersRouter}