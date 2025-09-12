const express = require("express")
const { getAllUsers, addUser, updateUser, deleteUser, getSingleUser } = require("../controllers/users.controller")
const { use } = require("./posts.router")

const userRouter = express.Router()

// ბილიკი რომელზეც პარამეტრების გადაცემა არ გვჭირდება და მხოლოდ მოქმედებს ყველა მომხმარებლის წამოსაღები ფუნქცია და ახალი მომხმარებლის დამატების ფუნქცია
userRouter
    .route("/")
    .get(getAllUsers)
    .post(addUser)


    // ეს ის ბილიკია როცა გვჭირდება პარამეტრის გადაცემა იმისთვის რომ ამოვიცნოთ თუ რომელი მომხმარებელი უნდა წამოვიღოთ, რომელი წავშალოთ ან რომლის მონაცემები უნდა განვაახლოთ
userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser)
    .get(getSingleUser)

module.exports = {userRouter}