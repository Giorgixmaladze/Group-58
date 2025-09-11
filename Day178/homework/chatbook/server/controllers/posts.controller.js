const { Post } = require("../model/posts.model")

const getAllPosts = async (req,res) =>{
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        console.error(err)
    }
}

const createPost = async (req,res) =>{
    const {title,content} = req.body

    try{
        const post = await Post.create({
            title,
            content,
            likesCount:0
        })

        res.json(post)
    }catch(err){
        console.log(err)
    }
}


const getSinglePost = async (req,res) =>{
    const {id} = req.params
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        res.json(post)
    }catch(err){
        console.error(err)
    }
} 



const deletePost = async (req,res) =>{
    const {id} = req.params

    try{
        const post = await Post.findByIdAndDelete(id)
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        res.json({message:"Post Deleted",post})
    }catch(err){
        console.error(err)
    }
}


module.exports = {getAllPosts,createPost,getSinglePost,deletePost}