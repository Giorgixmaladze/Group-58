const mongoose = require("mongoose")
// წინასწარ შექმნილი სქემა იმისთვის თუ თითოეული დოკუმენტი რისგან და როგორ უნდა იყოს აწყობილი
const postSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        likesCount: Number,
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    }
)


postSchema.index({ tags: 1, likesCount: -1 })
const Post = mongoose.model("Post", postSchema);


module.exports = { Post }