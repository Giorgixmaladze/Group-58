const express = require("express")

const app = express()


// express.json() არის middleware ფუნქცია, რომელსაც Express გვაძლევს.

// მისი დანიშნულებაა, რომ request body-ში წამოსული JSON მონაცემები გადაიყვანოს JavaScript ობიექტად და შევინახოთ req.body-ში.


app.use((req,res,next)=>{
    let body = ""
    req.on("data",chunk =>{
        body += chunk
    })

    req.on("end",()=>{
        try{
            req.body = JSON.parse(body)
        }catch(err){
            console.log(err)
        }
        next()
    })
})

app.listen(3000,()=>{
    console.log("Server is running")
})