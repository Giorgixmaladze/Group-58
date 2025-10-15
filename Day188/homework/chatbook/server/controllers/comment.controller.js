const Comment = require("../model/comment.model")
const { Post } = require("../model/posts.model")
const addComment = async (req, res, next) => {
    try {
        const { postId, text } = req.body
        const newComment = await Comment.create({
            postId,
            text
        })

        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id } }
        );

        res.json(newComment)
      
    } catch (err) {
        res.json(err)
    }
}


module.exports = addComment