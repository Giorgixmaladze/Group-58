const express = require("express")
const { Post } = require("../model/posts.model")
const { getAllPosts, getSinglePost, deletePost, createPost } = require("../controllers/posts.controller")
const protect = require("../middlewares/auth.middleware")


const postRouter = express.Router()

// ბილიკი რომელზეც პარამეტრების გადაცემა არ გვჭირდება და მხოლოდ მოქმედებს ყველა პოსტის წამოსაღები ფუნქცია და ახალი პოსტის დამატების ფუნქცია
postRouter.post("/",protect,createPost)

 
// ეს ის ბილიკია როცა გვჭირდება პარამეტრის გადაცემა იმისთვის რომ ამოვიცნოთ თუ რომელი პოსტი უნდა წამოვიღოთ ან რომელი წავშალოთ
postRouter
    .route("/:id")
    .get(getSinglePost)
    .delete(deletePost)


module.exports = postRouter