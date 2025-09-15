const mongoose = require("mongoose")
// წინასწარ შექმნილი სქემა იმისთვის თუ თითოეული დოკუმენტი რისგან და როგორ უნდა იყოს აწყობილი
const postSchema = new mongoose.Schema(
    {
        title:String,
        content:String,
        likesCount:Number
    }
)
const Post = mongoose.model("Post", postSchema);


module.exports = {Post}