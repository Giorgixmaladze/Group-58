const { Post } = require("../model/posts.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

// ყველა პოსტის წამოღება

const getAllPosts = catchAsync(async (req, res) => {
    let { limitFields } = req.query
    let query = Post.find()

    if (limitFields) {
        limitFields = limitFields.split(",")

        const excludeFields = limitFields.map(field => `-${field}`).join(" ")

        query = query.select(excludeFields)
        
     
    }



    const posts = await query

    res.json(posts)


})


// ახალი პოსტის დამატება
const createPost = catchAsync(async (req, res) => {
    const { title, content } = req.body


    const post = await Post.create({
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


// პოსტის წაშლა
const deletePost = catchAsync(async (req, res) => {
    const { id } = req.params

    const post = await Post.findByIdAndDelete(id)
    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }
    res.json({ message: "Post Deleted", post })

})


module.exports = { getAllPosts, createPost, getSinglePost, deletePost }