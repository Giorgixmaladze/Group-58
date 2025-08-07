process.stdin.setEncoding("utf-8");


process.stdin.on("data",(input) =>{
    if(input.trim() === "bye"){
        console.log("Goodbye")
        process.exit()
    }else console.log(input.trim())
})