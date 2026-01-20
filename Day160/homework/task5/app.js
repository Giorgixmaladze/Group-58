process.stdin.setEncoding("utf-8");

process.stdin.on("data",(input) =>{
    console.log(input.trim().toUpperCase())
})