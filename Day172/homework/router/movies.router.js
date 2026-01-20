const express = require("express")
const { getAllMovies, getSingleMovie, addMovie, deleteMovie, updateMovies } = require("../controllers/movies.controller")


const movieRouter = express.Router()

movieRouter
    .route("/")
    .get(getAllMovies)
    .post(addMovie)


movieRouter
    .route("/:id")
    .get(getSingleMovie)
    .delete(deleteMovie)
    .patch(updateMovies)




module.exports = {movieRouter}