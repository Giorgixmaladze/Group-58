const express = require("express")

const fs = require("fs")

const app = express()

const tours= JSON.parse(fs.readFileSync("../../tours.json"))




app.get("/", (req,res) =>{
    const {sort} = req.query

    const copiedTours = [...tours]

    if(sort==="duration"){
        copiedTours.sort((a,b) =>a.duration - b.duration)
    }else if(sort === "-duration"){
        copiedTours.sort((a,b) => b.duration - a.duration)
    }
    res.json(copiedTours)

})


app.get("/:id",(req,res) =>{
    const {id} = req.params

    const tour  =  tours.find((el) => el.id === id)
    
    if(!tour){
        return res.status(404).json({message:"Tour not found"})
    }
    res.json(tour)
})