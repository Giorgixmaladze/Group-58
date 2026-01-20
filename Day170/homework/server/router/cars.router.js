const express = require("express")

const carsRouter = express.Router()

const {getAllCars,getSingleCar,addCar,updateCar,deleteCar} = require("../controllers/cars.contoller.js")


carsRouter.get("/", (req,res) =>{
    getAllCars(req,res)
})

carsRouter.get("/:id",(req,res)=>{
    getSingleCar(req,res)
})

carsRouter.post("/",express.json(),(req,res)=>{
    addCar(req,res)
})


carsRouter.patch("/:id",express.json(),(req,res) =>{
    updateCar(req,res)
})

carsRouter.delete("/:id",(req,res) =>{
    deleteCar(req,res)
})


module.exports = {carsRouter}