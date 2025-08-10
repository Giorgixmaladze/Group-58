const fs =  require("fs");


const readDataCallback = (err,data) =>{
    if(err){
        console.log("file path incorrect")
    }else{
        console.log(data)
    }
}




fs.readFile("./text.txt","utf-8",readDataCallback)