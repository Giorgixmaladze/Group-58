const { Post } = require("../model/posts.model")
const User = require("../model/users.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

// ყველა მომხმარებლის წამოღება
const getAllUsers = catchAsync(async (req, res) => {

    const users = await User.find()
    res.json(users)




})

// მხოლოდ ერთი მომხმარებლის წამოღება id ის საშუალებით
const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.json(user)

})


//  ახალი მომხმარებლის დამატება
const addUser = catchAsync(async (req, res) => {
    const { name, email, password } = req.body

    const newUser = await User.create({
        name, email, password
    })
    res.json(newUser)
})




const updateUserPassword = catchAsync( async (req,res,next) =>{
    const {email,password} = req.body
    const user = await User.findOneAndUpdate(
        {email},
        {$set: {password}},
        {new:true}
    
    )
    if(!user){
        return next(new AppError("User not registered",404))
    }
    res.status(200).json({
        message:"password successfully updated",
    })
})
const updateUser = catchAsync(async (req, res) => {

    const updates = req.body

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates }
    )
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.json(user)

})


// მომხმარებლის წაშლა
const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).json({ message: "User Not found" })
    }
    res.json({ message: "user successfully deleted" })

})


module.exports = { getAllUsers, addUser, updateUser, deleteUser, getSingleUser,updateUserPassword }