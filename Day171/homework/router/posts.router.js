const express = require("express")
const { getAllPosts, getSinglePost, addPost, deletePost, updatePost, addComments } = require("../controllers/posts.controllers")

const postRouter = express.Router()

postRouter.get("/",(req,res) =>{
    getAllPosts(req,res)
})

postRouter.get("/:id",(req,res) =>{
    getSinglePost(req,res)
})

postRouter.post("/",(req,res) =>{
    addPost(req,res)
})


postRouter.delete("/:id",(req,res) =>{
    deletePost(req,res)
})

postRouter.patch("/:id",(req,res)=>{
    updatePost(req,res)
})

postRouter.post("/:id",(req,res) =>{
    addComments(req,res)
})
module.exports = {postRouter}