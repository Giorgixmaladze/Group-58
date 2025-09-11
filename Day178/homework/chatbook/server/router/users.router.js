const express = require("express")
const { getAllUsers, addUser, updateUser, deleteUser, getSingleUser } = require("../controllers/users.controller")
const { use } = require("./posts.router")

const userRouter = express.Router()


userRouter
    .route("/")
    .get(getAllUsers)
    .post(addUser)

userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser)
    .get(getSingleUser)

module.exports = {userRouter}