const express = require("express")
const { Post } = require("../model/posts.model")


const postRouter = express.Router()


postRouter.post("/",async (req,res) =>{
    const {title,content} = req.body

    const newPost = await Post.create({
        title,content,likesCount:0
    })

    res.json(newPost)
})


module.exports = postRouter