// შექმენით ერთი ფაილი text.txt მასში დაწერეთ რაიმე წინადადება, თქვენი დავალებაა რომ დაა - import - ოთ fs მოდული, წაიკითხოთ ფაილი readFile მეთოდის გამოყენებით და დაბეჭდოთ ის


const fs = require("fs")

const readDataCallback = (err,data) =>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
}


fs.readFile("./text.txt","utf-8",readDataCallback)