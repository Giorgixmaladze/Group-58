// process.stdout - ის დახმარებით მომხმარებელს მოსთხოვეთ რომ შემოიტანოს password - ი, process.stdin - ის დახმარებით მომხმარებელს შემოატანინეთ პაროლი და გამოუტანეთ თავისი პაროლი xxxx - ების სახით მაგალთად - შევიტანეთ პაროლი - securedPassword123, უნდა გამოიტანოთ როგორც x * securedPassword123 - სიმბოლოების რაოდენობაზე

const process = require("process")
process.stdin.setEncoding("utf-8")

process.stdout.write("Please Enter your password:")

process.stdin.on("data",(input) =>{
    input = input.trim()
    let s = ""
    for(let i = 0; i<input.length; i++){
        s += "X"
    }
    console.log(s)
    process.exit()
})

