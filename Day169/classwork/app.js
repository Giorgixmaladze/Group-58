const express = require("express")

const fs = require("fs")

const app = express()

const tours = JSON.parse(fs.readFileSync("./tours.json"))

// შექმენით route რომლის მეთოდიც იქნება GET და ბილიკი /tours, გაითვალისწინეთ ის ფაქტი რომ ეს როუტე აბრუნებს მთლიან ტურების მასივს, მაგრამ შესაძლოა მიიღოთ  query სახელად sort რომელშიც გადმოგეცემათ ან price ან -price, თუ გადმოგეცათ price მაგ შემთვევაში დაალაგეთ ზრდადობით ტურების მასივი და დაუბრუნეთ დალაგებული მასივი (შენიშნვნა არ შეცვლაოტ ორიგინალი მასივი) მაგრამ თუ გადმოგეცათ -price მაგ შემთხვევაში დაალაგეთ ტურების მასივი კლ;ებადობით ფასის მიხედვით, თუ საერთოდ არ გადმოგეცათ sort query მაგ შემთხვევაში დააბრუნეთ ჩვეულებრივად ტურების მასივი 

app.get("/tours", (req, res) => {
  const { sort,limit } = req.query;
  const result = [...tours];
  if(limit){
    result.splice(limit,tours.length - limit)
  }
  if (sort === "price") {
    result.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "-price") {
    result.sort((a, b) => b.price - a.price);
  }

  res.json(result);
});


app.listen(3000,() =>{
    console.log("Server is running")
})