const fs = require("fs")

let hotels = JSON.parse(fs.readFileSync("./data/hotels.json"))

const getAllHotels = (req, res) => {
    res.json(hotels)
}


const getSingleHotel = (req, res) => {
    const { id } = req.params

    const hotel = hotels.find(hotel => hotel.id === parseInt(id))

    if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" })
    }

    res.json(hotel)
}


const updateHotel = (req, res) => {
    const { id } = req.params
    const { name, location, rating, pricePerNight } = req.body
    if (!name || !location || !rating || !pricePerNight) {
        return res.status(401).json({ message: "All fields required" })
    }
    const hotel = hotels.find(hotel => hotel.id === parseInt(id))

    if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" })
    }
    if (name) hotel.name = name
    if(location) hotel.location = location
    if(rating)hotel.rating = rating
    if(pricePerNight)hotel.pricePerNight = pricePerNight

    fs.writeFileSync("./data/hotels.json",JSON.stringify(hotels))

    res.json(hotel)

}

const addHotel = (req,res) =>{
    const  { name, location, rating, pricePerNight } = req.body

     if (!name || !location || !rating || !pricePerNight) {
        return res.status(401).json({ message: "All fields required" })
    }
    const newHotel = {
        id:hotels.length? hotels[hotels.length - 1].id + 1:1,
        name,
        location,
        rating,
        pricePerNight
    }
    hotels.push(newHotel)
    fs.writeFileSync("./data/hotels.json",JSON.stringify(hotels))
    res.json(newHotel)
}


const deleteHotel = (req,res) =>{
    const {id} = req.params

    const hotelIndex = hotels.findIndex(hotel => hotel.id === parseInt(id))

    if(hotelIndex === -1){
        return res.status(404).json({message:"Hotel not found"})
    }

    hotels.splice(hotelIndex,1)

    fs.writeFileSync("./data/hotels.json",JSON.stringify(hotels))


    
}

module.exports = {getAllHotels,getSingleHotel,updateHotel,addHotel,deleteHotel}