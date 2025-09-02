const fs = require("fs")

let posts = JSON.parse(fs.readFileSync("./data/posts.json"))



const getAllPost = (req,res) =>{
    res.json(posts)
}


const getSinglePost = (req,res) =>{
    const {id} = req.params

    const post = posts.find(post => post.id === parseInt(id))

    if(!post){
        res.status(404).json({message:"Post not found"})
    }

    res.json(post)
}



const addPost = (req,res) =>{
    const {author,title,description} = req.body

    if(!author || !title || !description){
        return res.status(401).json({message:"All fields required"})
    }
    const newPost = {
        id:posts.length? posts[posts.length-1].id + 1: 1,
        author,
        title,
        description
    }
    posts.push(newPost)

    fs.writeFileSync("./data/posts.json", JSON.stringify(posts))

    res.json(newPost)
}



const updatePost = (req,res) =>{
    const {id} = req.params
    const {author,title,description} = req.body

    const post = posts.find(post => post.id === parseInt(id))

    if(!post){
        return res.status(404).json({message:"post not found"})
    }
    
    if(author) post.author = author
    if(title) post.title = title
    if(description) post.description = description

  
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts))

    res.json(post)
}


module.exports = {getAllPost,getSinglePost,addPost,updatePost}