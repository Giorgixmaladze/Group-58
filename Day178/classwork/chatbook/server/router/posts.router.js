const express = require("express")
const { Post } = require("../model/posts.model")
const { getAllPosts, getSinglePost, deletePost, createPost } = require("../controllers/posts.controller")


const postRouter = express.Router()


postRouter
    .route("/")
    .get(getAllPosts)
    .post(createPost)

postRouter
    .route("/:id")
    .get(getSinglePost)
    .delete(deletePost)


module.exports = postRouter