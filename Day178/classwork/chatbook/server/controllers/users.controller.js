const { User } = require("../model/users.model")


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.error(err)
    }



}


const getSingleUser = async (req,res) =>{
    const {id} = req.params
    try{
        const user = User.findById(id)
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        res.json(user)
    }catch(err){
        console.error(err)
    }
}

const addUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const newUser = await User.create({
            name, email, password
        })
        res.json(newUser)
    }catch(err){
        console.error(err)
    }
}

const updateUser = async (req,res) =>{
    try{
        const updates = req.body

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {$set:updates}
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    }catch(err){
        console.error(err)
    }
}

const deleteUser = async(req,res) =>{
    const {id} = req.params
    try{
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({message:"User Not found"})
        }
        res.json({message:"user successfully deleted"})
    }catch(err){
        console.error(err)
    }
}


module.exports = {getAllUsers,addUser,updateUser,deleteUser,getSingleUser}