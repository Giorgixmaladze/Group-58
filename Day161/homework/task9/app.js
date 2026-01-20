//  შექმენით ფაილი text2.txt მასში შეინახეთ წინადადებები, process ობიექტის დახმარებით მომხმარებელს შემოატანინეთ რაიმე წინადადება, enter - ზე დაჭერის შემდეგ მომხმარებლის მიერ შემოტანილი წინადადება უნდა დაემატოს text2.txt - ის ფაილში


const process = require("process");
const fs = require("fs");

process.stdin.setEncoding("utf-8")

process.stdin.on("data",(input) =>{
    input = input.trim()

    fs.appendFile("./text2.txt",input,(err)=>{
        if(err){
            console.log(err)
        }
    })
})

