const express = require("express")
const { getAllHotels, getSingleHotel, updateHotel, deleteHotel, addHotel } = require("../controllers/hotel.controller")


const hotelRouter = express.Router()

hotelRouter
    .route("/")
    .get(getAllHotels)
    .post(addHotel)

hotelRouter
    .route("/:id")
    .get(getSingleHotel)
    .patch(updateHotel)
    .delete(deleteHotel)
    

module.exports = {hotelRouter}