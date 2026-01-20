// process.stdin - ის დახმარებით მომხმარებელს შემოატანინეთ ასო, შეამოწმეთ თუ მომხმარებლის მიერ შემოტანილი ასო არის ხმოვანი მაშინ გამოუტენეთ რომ ${userInput} is vowel სხვა შემთხვევაში კი ${userInput} is consonant
const process = require("process")

process.stdin.setEncoding("utf-8")

process.stdin.on("data" , (input) =>{
    input = input.trim()
    const vowels = ["a","e","i","o","u"]
    if(vowels.some(vowel => input.includes(vowel))){
        console.log(`${input} is vowel`)
    }else{
        console.log(`${input} is consonant`)
    }
})