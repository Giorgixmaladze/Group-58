const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
dotenv.config()

const app = express()


if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

//  შექმენით .env, .gitignore ფაილები, .env ფაილში შექმენით ორი ცვლადი NODE_ENV - ამ ცვლადს მიანიჭეთ მნიშევნელობები ან development ან production (კომენტარების სახით ახსენით თუ რას ნიშნავს თითოეული მათგანი), PORT, .gitignore ფაილში შეინახეთ ფაილები როგორიცაა .env, node_modules, მთავარ ფაილში გააკეთეთ შემოწმება იმ შემთხვევაში თუ env ფაილში NODE_ENV ცვლადის მნიშვნელობა არის development - ის ტოლი მაშინ გამოიყენეთ morgan - ი და დააბრუნეთ მოთხოვნის შესახებ ინფორმაცია, (დაგჭირდებათ process + env ფაილი + ამ ფაილში არსებული ცვლადის სახელი), გამოიყენეთ PORT ცვლადის მნიშვნელობაც app.listen მეთოდში 


// development - მარტივად რომ ვთქვათ არის დეველოპერების გარემო ანუ არ არის ჯერ ჯერობით რეალური სერვერი, ამ შემთხვევაში ჯერ დეველოპერი მუშაობს კოდზე და ტესტავს მას,თუ რაიმე შეცდომა იქნება გამოასწორებს და ა.შ



// production - აქ უკვე რეალური სერვერია შექმნილი რომელსაც ხალხი იყენებს,ამ შემთხვევაში უნდა იმუშაოს მაქსიმალურად სწრაფად და სტაბილურად, ანუ მარტივად რომ ვთქვათ საბოლოო პროდუქტია

app.listen(process.env.PORT,() => {
    console.log("Server is running")
})