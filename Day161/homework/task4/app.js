//  შექმენით ფაილი text1.txt მასში შეინახეთ რაიმე სიტყვები, თქვენი დავალებაა რომ fs.readFile - ის დახმარებით წაიკითხოთ ფაილი და console - ში დაბეჭდოთ, სიტყვები upperCase() - ში

const fs = require("fs");

const readDataCallback = (err,data) =>{
if(err){
    console.log("Something bad happened!")
}else{
    console.log(data.toUpperCase())
}
}


fs.readFile("./text1.txt","utf-8",readDataCallback)