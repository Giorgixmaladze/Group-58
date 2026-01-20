// შექმენით თვქენი სერვერი რომელსაც აამუშავებთ პორტ 3000ზე, როდესაც მოთხოვნა გამოიგზავნება ან / ან /homel ურლზე მაგ შემთხვევაში წაიკითხ index.html ფაილის შიგთავის და დაუბრენთ end ით, ხოლო თუ ბილი უდრის /register წაიკითხეთ register.html შიგთავის და დაუბრუნეთ, საბოლოოდ თუ ბილი არცერთს არ ემთხვევა დაუბრუნეთ ტექსტად ერთი სათაური და ჩასვით 404 Not Found


const http = require("http")
const fs = require("fs")

const homeHtml = fs.readFileSync("./index.html")
const server = http.createServer((req,res) =>{
    console.log(req)
    if(req.url ==="/" || req.url ==="/home"){
        res.end(homeHtml)
    }else{
        res.end("<h1>404 Page not found</h1>")
    }
})


server.listen(8000,()=>{
    console.log("server is running")
})