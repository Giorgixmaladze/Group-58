const express = require("express");
const { movieRouter } = require("./router/movies.router");

//  შექმენით movies API, თქვენ უნდა შეგეძლოთ ახალი ფილმების დამატება, წაშლა, განახლება, ფილმების წამოღება მთლიანად და id - ის მიხედვით, შექმენით ერთი folder - ი სახელად routers მასში კი ერთი ფაილი სახელად movie.router.js ამ ფაილში თქვენ უნდა დაარეგისტრიროთ მოცემულ route - ზე მეთოდები როგორიცაა get, post, patch, delete, კოდი უფრო ორგანიზებული რომ იყოს შექმენით კიდევ ერთი folder - ი სახელად controllers, მასში კი ფაილი სახელად movie.controller.js ამ ფაილში უნდა გქონდეთ ყველა მეთოდისთვის ფუნქცია, ეს ფუნქციები module.exports - ის გამოყნებით დაა - export - ეთ და გადაიტანეთ movie.router.js - ის ფაილში სადაც გამოიყენებთ მათ, ერთიდაიგივე ბილიკებისთვის გამოიყენეთ route მეთოდი
const app = express();

app.use(express.json())


app.use("/movies",movieRouter)

app.listen(3000,() =>{
    console.log("Server is running")
})