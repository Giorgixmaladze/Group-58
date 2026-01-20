// შექმენით ფაილი რომელშიც ჩაწერთ რაიმე დიდ წინადადებას, შემდეგ დააიმპორტეთ  fs მოდული თქვენს script ში, წაიკითხეთ მოცემული ფაილი და წაკითხული მონაცემები გამოიტანეთ console ში (გამოიყენეთ ორივე ტიპის მეთოდი ასინქრონუილიც (readFile)  და სინქრონულიც (readFileSync), შეადარეთ მათი მუშაობა და ახსენით კომენტარებით მათ შორის განსხვავება და რა არის სინქრონული და ასიუქნრონული კოდი)



const fs = require("fs")

const readDataCallback = (err,data) =>{
    if(err){
        console.log("Something bad happened")
    }else{
        console.log(data)
    }
}

fs.readFile("./text.txt","utf-8",readDataCallback)

