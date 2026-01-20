const express = require("express")


const postsRouter = express.Router()

const {getAllPosts,getSinglePost,addPost,deletePost,updatePost} = require("../controllers/posts.controls")

postsRouter.get("/", (req,res) =>{
    getAllPosts(req,res)
})


postsRouter.get("/:id",(req,res) =>{
    getSinglePost(req,res)
})


postsRouter.post("/",(req,res) =>{
    addPost(req,res)
})


postsRouter.delete("/:id",(req,res) =>{
    deletePost(req,res)
})

postsRouter.patch("/:id",(req,res) =>{
    updatePost(req,res)
})


module.exports = {postsRouter}