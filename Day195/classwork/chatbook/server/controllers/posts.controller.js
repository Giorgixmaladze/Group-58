const { get } = require("mongoose")
const { Post } = require("../model/posts.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

// ყველა პოსტის წამოღება

const getAllPosts = catchAsync(async (req, res) => {
    let { tags} = req.query
    const query = await Post.find().sort({ likesCount: -1 })

    if (tags) {
        tags = tags.split(",")
        query = query.find({tags: {$all:tags}})
        

    }

    const posts = await query

    res.json(posts)


})
const getPostsByUserId = catchAsync(async (req, res) => {
    const { userId } = req.params
    const posts = await Post.find({ userId })
    res.json(posts)
})
// ახალი პოსტის დამატება
const createPost = catchAsync(async (req, res) => {
    const {title,content,likesCount} = req.body

    
        const post = await Post.create({
            userId:req.user._id,
            fullName:req.user.name,
            title,
            content,
            likesCount: 0
        })

        res.json(post)
    
})


//მხოლოდ ერთი პოსტის წამოღება ID ის საშუალებით
const getSinglePost = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const post = await Post.findById(id)
    if (!post) {
        return next(new AppError("Post not found", 404))
    }
    res.json(post)

})

const updatePost = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { title, content } = req.body
    const post = await Post.findById(id)
    if (!post) {
        return next(new AppError("Post not found", 404))
    }
    if(post.userId.toString() !== req.user._id.toString()){
        return next(new AppError("You can't edit or delete this post", 403))
    }
    const updatedPost = await Post.findByIdAndUpdate(id, {title, content}, { new: true })
    res.json(updatedPost)
})

// პოსტის წაშლა
const deletePost = catchAsync(async (req, res,next) => {
    const { id } = req.params
 
    const post = await Post.findById(id)
    if (!post) {
        return next(new AppError("Post not found", 404))
    }
    if(post.userId.toString() !== req.user._id.toString()){
        return next(new AppError("You can't edit or delete this post", 403))
    }
    
    await Post.findByIdAndDelete(id)

    res.json({ message: "Post Deleted" })

})


module.exports = { getAllPosts, createPost, getSinglePost, deletePost,updatePost,getPostsByUserId }