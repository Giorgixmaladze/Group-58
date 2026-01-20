const fs = require("fs")

const posts = JSON.parse(fs.readFileSync("./data/posts.json"))

const getAllPosts = (req,res) =>{
    res.json(posts)
}


const getSinglePost = (req,res) =>{
    const {id} = req.params

    const post = posts.find(post => post.id === parseInt(id))

    if(!post){
        return res.status(404).json({message:"post not found"})
    }

    res.json(post)
}


const addPost = (req,res)=> {
    
    const newPost = {
        id:Date.now(),
        ...req.body
    }

    posts.push(newPost)
    fs.writeFileSync("./data/posts.json",JSON.stringify(posts))
}

const deletePost = (req,res) =>{
    const {id} = req.params

    const postIndex = posts.findIndex(post => post.id === parseInt(id))

    if(postIndex === -1){
        return res.status(404).json({message:"Post not found"})
    }
    posts.splice(postIndex,1)

    fs.writeFileSync("./data/posts.json",JSON.stringify(posts))
}


const updatePost = (req,res) =>{
    const {id} = req.params

    const postIndex = posts.findIndex(post => post.id === parseInt(id))

    if(postIndex === -1){
        return res.status(404).json({message:"post not found"})
    }


    posts[postIndex] = {
        id:parseInt(id),
        ...req.body
    }


    fs.writeFileSync("./data/posts.json",JSON.stringify(posts))
}


module.exports = {getAllPosts,getSinglePost,addPost,deletePost,updatePost}