const fs = require("fs")


const cars = JSON.parse(fs.readFileSync("./data/cars.json"))


const getAllCars = (req, res) =>{
    res.json(cars)
}

const getSingleCar = (req,res) =>{
    const {id} = req.params

    const car = cars.find(car => car.id === parseInt(id))
    if(!car){
        return res.status(404).json({message:"Car not found"})
    }
    res.json(car)
}



const addCar = (req,res) =>{
    const {brand, model, year} = req.body


    if(!model || !brand || !year){
        return res.status(400).json({message:"All fields are required!"})
    }
    const car = {
        brand,
        model,
        year,
        id:cars.length? cars[cars.length - 1].id + 1: 1
    }

    cars.push(car)

    fs.writeFileSync("./data/cars.json", JSON.stringify(cars))
}



const updateCar = (req,res) =>{
    const {id} = req.params

    const carIndex = cars.find(car => car.id === parseInt(id))

    if(carIndex === -1){
        return res.status(404).json({message:"car not found"})
    }

    cars[carIndex] = {id:parseInt(id), ...req.body}


    fs.writeFileSync("./data/cars.json",JSON.stringify(cars))

    res.json(cars[carIndex])
}



const deleteCar = (req,res) =>{
    const {id} = req.body

    const carIndex = cars.findIndex(car => car.id === parseInt(id))

    cars.splice(carIndex,1)

    fs.writeFileSync("./data/cars.json",JSON.stringify(cars))

}

module.exports = {getAllCars,getSingleCar,addCar,updateCar,deleteCar}