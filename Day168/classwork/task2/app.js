// შექმენით express სერვერი, რომელიც უსმენს მოთხოვნებს პორეტ 3000სზე თქვენი დავალებაა, შექმნათ თავიდან მასივი რომელშიც იქნება 5 მანქანა მოცემული, დაარეგისტრირეთ როუტე GET /cars რომელიც დააბრუნებს ყველა მანქანას json ფორმატში, შემდეგ დაარეგისტრირეთ GET /cars/:id როუტე, დასერჩეთ ექსპრესში როგორ გამოიყენოთ პარამეტრები, შესწავლის შემდეგ მასივიდან აირჩიეთ ის მანქანა რომელიც ემთხვევა გადმოცემულ პარამეტრს და დააბრუნეთ json ფორმატში, დაამატეთ DELETE /cars/:id როუტე რომლითაც მასივიდან წაშლით ობიექტს და დააბრუნებთ წაშლილ ობიექტს შესაბამისი სტატუსის კოდით და საბოლოოდ შექმენით POST /cars როუტე რომლითაც დაამატებთ ახალ მანქანას მასივში ID ავტოიმატურად უნდა ემატებოდეს და შექმენის შემდეგ დააბრუნებთ ახალ მანქანის ობიექტს json ფომატში, მოიძიეთ იუნფორმაცია midlleware  შესახებ და რას აკეთებს express.json ახსენით კომენტარებით, გატესტეთ postman გამოყენებით თქვენი შექმენილი express ის API

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

app.delete("/cars/:id", (req, res) => {
    const {id} = req.params;
    let cars = JSON.parse(fs.readFileSync("./cars.json"));
    const updatedTours = cars.filter(car => car.id !== parseInt(id))
    fs.writeFileSync("./cars.json", JSON.stringify(updatedTours))
    res.json({ message: "car deleted"});

})


app.post("/cars",express.json(),(req,res) =>{
    let cars = JSON.parse(fs.readFileSync("./cars.json"));
    const newCar = {
        id:cars.length + 1,
        ...req.body
    }
    cars.push(newCar)
    fs.writeFileSync("./cars.json", JSON.stringify(cars))
    res.status(201).json({message:"car added",car: newCar})

})


app.listen(8000, () => {
    console.log("server is running")
})


// middleware არის შუამავალი ფუნქციები, რომლებიც Express-ში ამუშავებენ მოთხოვნებს, ამატებენ ახალ შესაძლებლობებს და მართავენ request → response პროცესს.


// express.json() გვაძლევს საშუალებას, რომ client-ის JSON მონაცემები პირდაპირ მივიღოთ req.body-ში როგორც ობიექტი.