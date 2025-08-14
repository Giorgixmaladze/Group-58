// 1) შექმენით 3 განსხვავებული html - ის ფაილი, ჩაწერეთ მათში რაიმე ტექსტები, შექმენით თქვენივე server - ი აამუშავეთ ის  port - 3000 ზე, თქვენი დავალებაა რომ მომხმარებელს random - ულად გამოუტაონოთ html - ის ფაილები, დაგჭირდებათ fs.readFile რომ წაიკითხოთ random html - ის ფაილები


const http = require("http")
const fs = require("fs")

const files = ["./index.html","./login.html","./regiser.html"]
const server = http.createServer((req,res) =>{
    const randomFile = Math.floor(Math.random() * files.length)
    fs.readFile(files[randomFile],(err,data) =>{
        if(err){
            console.log(err)
        }else{
            res.end(data)
        }
    })
})

server.listen(3000,()=>{
    console.log("server is running")
})