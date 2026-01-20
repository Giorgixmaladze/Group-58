process.stdin.setEncoding("utf-8")
let sum = 0
process.stdin.on("data", (input) =>{
    if(input.trim() === "exit") process.exit()
    else sum += Number(input) 
    console.log(sum)  
})
