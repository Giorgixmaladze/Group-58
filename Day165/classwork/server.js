//  შექმენიტ სერვერი რომელიც აბრუნებს სერვერიდან მანქანის მონაცემებს მინ 10 ელ, თვენი დავალებაა ფაილიდან წაიკითხოთ ეს მონაცემები და დააბრუნეთ ყველა მონაცემი კლიენტთან, მაგრამ თუ ლინკში არის მოცემული საძიებელი სიტყვა (შეამოწმეთ გვაქვს თუ არა id) მაგ შემთხვევაში უბრუნებთ ერთ კონკრეტულ მანქანას, თუ id არ არის ვალიდური (ვგულისხმოპბ არ არსებობს ობიექტი გადმოცემული id) მაგ შემთხვევაშიო დააბრუნეთ კოდი 404 და html თეგი რომელში შასმულია მანქანა ვერ მოიძებნა


const http = require("http")
const fs = require("fs")
const url = require("url")
const cars = JSON.parse(fs.readFileSync("./cars.json", "utf-8"))

const singleCar = (req, res) => {
    const urlParts = url.parse(req.url, true)
    const carId = parseInt(urlParts.query.id)
    const car = cars.find(car => car.id === carId)
    if (!car) {
        res.writeHead(404, { "Content-Type": "text/html" })
        return res.end("<h1>Car not found</h1>")
    } else {
        res.writeHead(200, { "Content-Type": "application/json" })
        return res.end(JSON.stringify(car))
    }
}


const server = http.createServer((req, res) => {
    const urlParts = url.parse(req.url, true)
    if (urlParts.path === "/cars") {
        return res.end(cars)
    } else {
        singleCar(req, res)
    }


})


server.listen(3000, () => {
    console.log("Server is running")
})