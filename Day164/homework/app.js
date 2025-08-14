

//  შექმენით თქვენივე server - ი, რომელიც იღებს POST request - ს, როდესაც მომხამრებელი გააგზავნის რაიმე მოთხოვნას server - მა ეს მოთხოვნები (message - ები) უნდა მიიღოს და დაამატოს messages - ის მასივში, საბოლოოდ კი უნდა გამოიტანოს message - ი როგორიცაა 'Message saved in messages array' console - ში, გამოიყენეთ writeHead, status - ის კოდისთვის, if - ში შეამოწმეთ თუ req.url არის '/messages' და მეთოდი არის POST - ი მაშინ შეასრულეთ ზემოთ მოცემული დავალება, სხვა შემთხვევაში კი გამოიტანეთ ERROR happened
const http = require("http")
const fs = require("fs")
let messages = []
const server =  http.createServer((req,res) =>{
    if(req.url === "/messages" && req.method === "POST"){
        let data = ""
        req.on("data",chunk => {
            data += chunk
        })
        messages.push(data)
        res.end("Messages saved in messages array")
    }
})


server.listen(3000,()=>{
    console.log("server is running")
})