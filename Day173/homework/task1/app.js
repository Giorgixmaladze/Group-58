// შექმენით სამი middleware ფუნქცია, პირველი middleware - ფუნქცია უნდა აკეთებდეს იგივე რამეს რასაც express.json() გამოიძახეთ next() ფუნქცია იმ შემთხვევაში თუ წარმატებით დასრულდა მომხმარებლის მიერ შემოტანილი მონაცამების წაკითხვა, შექმენით მეორე middleware - ი რომელიც შეამოწმებს მომხმარებლის email - ს, თუ ის უდრის 'Admin@gmail.com' - ს, მაშინ გამოიძახეთ next() ფუნქცია სხვა შემთხვევაში კი დააბრუნეთ მნიშვნელობა 'You are not allowed to view this content because you are not an Admin', next() ფუნქციის გამოძახების შემდეგ შექმენით მესამე middleware ფუნქცია რომელიც დააბრუნებს მნიშვნელობას 'Admin has private messages'


const express = require("express")

const app = express()


app.use((req,res,next) =>{
    let body = ""

    req.on("data",chunk =>{
        body += chunk
    })

    req.on("end",() =>{
        try{
            req.body = JSON.parse(body)
            next()
        }catch(err){
            return res.status(400).json({message:"Invalid JSON"})
        }
      
    })
})



app.use((req,res,next) =>{
    const {email} = req.body

    if(email!== 'Admin@gmail.com' ){
        return res.status(401).json({message:"You are not allowed to view this content because you are not an Admin"})
    }
    
    next()
})


app.use((req,res,next) =>{
    return res.status(200).json({message:"Admin has private messages"})
})
app.listen(3000,() =>{
    console.log("Server is running")
})