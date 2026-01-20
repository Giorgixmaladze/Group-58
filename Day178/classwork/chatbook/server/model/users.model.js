const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[6,"min length is 6"]
    }
})

const User = mongoose.model("User",userSchema)


module.exports = {User}