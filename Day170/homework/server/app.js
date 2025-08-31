//  შექმენით cars API, უნდა შეგეძლოთ ახალი მაქანების დამატება, წაშლა, განახლება, წამოღება, თქვენი დავალებაა რომ მოცემული მეთოდები დაარეგისტრიროთ cars.router.js - ის ფაილში, შექმენით controllers folder - ი სადაც თქვენ შეინახავთ მოცემული მეთოდებისთვის ფუნქციებს, საბოლოოდ კი მოცემული ფუნქციები დაა - export - ეთ და გამოიყენეთ cars.router.js ფაილში, დაა - export - ეთ cars.router.js - ი და მთავარ ფაილში use მეთოდის გამოყენებით დაარეგისტრირეთ ის, შექმენით client - ის folder - ი, და შეეცადეთ რომ თქვენი client - ი დააკავშიროთ server - თან


const express = require("express")
const cors = require("cors");
const app = express()

const {carsRouter} = require("./router/cars.router.js")
app.use(cors());

app.use("/cars",carsRouter)

app.listen(3000,() =>{
    console.log("Server is running")
})