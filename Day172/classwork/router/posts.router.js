const express = require("express")
const { getAllPost, getSinglePost, addPost, updatePost } = require("../controllers/post.controller")

const postRouter = express.Router()


postRouter
    .route("/")
    .get(getAllPost)
    .post(addPost) 


postRouter
    .route("/:id")
    .get(getSinglePost)
    .patch(updatePost)

module.exports = {postRouter}