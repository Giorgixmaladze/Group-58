let randomNum = Number((Math.random()*2).toFixed(0))

const randomError = (data) =>{
    if(data === 1){
        console.log(data)
    }else if(data === 0){
        throw new Error("Something bad happened!")
    }
}

randomError(randomNum)