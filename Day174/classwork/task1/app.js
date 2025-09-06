const express = require("express")




const app = express()

// მოიძიეთ ინფორმაცია morgan ის შესახებ და გააკეთეთ მის პატარ კლონი (შუამავლი ფუნქციის სახით) კომენტარებით ახსენით რა არის middleware რეებს შორის ეშვება ეს ფუნქცია და როგორ მუშაობს ის

// morgan მოდულის საშუალებით შეგვიძლია მივიღოთ მოთხოვნის შესახებ ინფორმაცია სხვადასხვა ფორმატში

const miniMorgan = (req,res,next) => {
    const start = Date.now()

    res.on("finish",() =>{
        const duration = Date.now() - start
        console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration} ms`)
    })
    next()
}


app.use(miniMorgan)

app.get("/", (req, res) => {
  res.send("Home page")
})


app.listen(3000,()=>{
    console.log("Server is running")
})

