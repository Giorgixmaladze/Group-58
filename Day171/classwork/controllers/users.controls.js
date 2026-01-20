const fs = require("fs")

const users = JSON.parse(fs.readFileSync("./data/users.json")) 

const getAllUsers = (req,res) =>{
    res.json(users)
}

const getSingleUser = (req,res) =>{
    const {id} = req.params

    const user = users.find(user => user.id === parseInt(id))

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    res.json(user)

}


const addUser = (req,res) =>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(401).json({message:"All fields required"})
    }


    const newUser = {
        name,
        email,
        password,
        id:Date.now()
    }
    users.push(newUser)

    fs.writeFileSync("./data/users.json",JSON.stringify(users))

    res.json(newUser)
}



const login = (req,res) =>{
    const {email, password} = req.body

    const found = users.find(user=> user.email === email & user.password === password)

    if((!email || !password) || !found ){
        return res.status(401).json({message:"Something wrong happened"})
    }

    res.json({
        name:found.name,
        email:found.email,
        id:found.id
    })


}


module.exports = {getAllUsers,getSingleUser,addUser,login}