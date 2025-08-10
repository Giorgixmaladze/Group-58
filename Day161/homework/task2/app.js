//  1 დავალების გაკეთება სცადეთ ხელახლა ამჯერად სინქრონიზირებულად fs.readFileSync - ის გამოყენებით, შეინახეთ ის ცვლადში და დაბეჭდეთ
const fs = require("fs");



const read = fs.readFileSync("./text.txt","utf-8")

console.log(read)
