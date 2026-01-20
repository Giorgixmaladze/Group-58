// შექმენით express სერვერი, რომელიც უსმენს მოთხოვნებს პორეტ 3000სზე თქვენი დავალებაა, შექმნათ თავიდან მასივი რომელშიც იქნება 5 მანქანა მოცემული, დაარეგისტრირეთ როუტე GET /cars რომელიც დააბრუნებს ყველა მანქანას json ფორმატში, შემდეგ დაარეგისტრირეთ GET /cars/:id როუტე, დასერჩეთ ექსპრესში როგორ გამოიყენოთ პარამეტრები, შესწავლის შემდეგ მასივიდან აირჩიეთ ის მანქანა რომელიც ემთხვევა გადმოცემულ პარამეტრს, გატესტეთ postman გამოყენებით თქვენი შექმენილი express ის APIს


const express = require("express");
const fs = require("fs");
const app = express();

app.get("/cars", (req,res) =>{
    const cars = JSON.parse(fs.readFileSync("cars.json"));
    return res.json(cars)
})


app.get("/cars/:id", (req,res) =>{
    const {id} = req.params;
    const cars = JSON.parse(fs.readFileSync("./cars.json"))
    const car = cars.find(car => car.id === parseInt(id))
    if(!car){
        return res.status(404).json({message:"car not found"})
    }
    res.json(car)
})

app.listen(3000,() =>{
    console.log("Server is running")
})
