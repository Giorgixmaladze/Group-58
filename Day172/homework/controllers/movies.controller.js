const fs = require("fs")

const movies = JSON.parse(fs.readFileSync("./data/movies.json"))
//  შექმენით movies API, თქვენ უნდა შეგეძლოთ ახალი ფილმების დამატება, წაშლა, განახლება, ფილმების წამოღება მთლიანად და id - ის მიხედვით, შექმენით ერთი folder - ი სახელად routers მასში კი ერთი ფაილი სახელად movie.router.js ამ ფაილში თქვენ უნდა დაარეგისტრიროთ მოცემულ route - ზე მეთოდები როგორიცაა get, post, patch, delete, კოდი უფრო ორგანიზებული რომ იყოს შექმენით კიდევ ერთი folder - ი სახელად controllers, მასში კი ფაილი სახელად movie.controller.js ამ ფაილში უნდა გქონდეთ ყველა მეთოდისთვის ფუნქცია, ეს ფუნქციები module.exports - ის გამოყნებით დაა - export - ეთ და გადაიტანეთ movie.router.js - ის ფაილში სადაც გამოიყენებთ მათ, ერთიდაიგივე ბილიკებისთვის გამოიყენეთ route მეთოდი

const getAllMovies = (req,res) =>{
    res.json(movies)
}


const getSingleMovie = (req,res) =>{
    const {id} = req.params

    const movie = movies.find(movie => movie.id === parseInt(id))

    if(!movie){
        res.status(404).json({message:"Movie can't be found"})
    }

    res.json(movie)
}


const addMovie = (req,res) =>{
    const {title,year,genre} = req.body

    if(!title || !year || !genre){
        return res.status(401).json({message:"All fields required"})
    }
    const newMovie = {
        id:movies.length? movies[movies.length - 1].id + 1:1,
        title,
        year,
        genre
    }
    movies.push(newMovie)
    fs.writeFileSync("./data/movies.json",JSON.stringify(movies))
    res.json(movies)
}


const deleteMovie = (req,res) =>{
    const {id} = req.params

    const movieIndex = movies.findIndex(movie => movie.id === parseInt(id))
    if(movieIndex === -1) {
        return res.status(404).json({message:"Movie can't found"})
    }
    movies.splice(movieIndex,1)

    fs.writeFileSync("./data/movies.json",JSON.stringify(movies))

}



const updateMovies = (req,res) =>{
    const {id} = req.params

    const {title, year, genre} = req.body

    if(!title || !year || !genre){
        return res.status(404).json({message:"All fields required"})
    }

    const movie = movies.find(movie => movie.id === parseInt(id))

    if(title)movie.title = title
    if(year) movie.year = year
    if(genre) movie.genre = genre

    fs.writeFileSync("./data/movies.json",JSON.stringify(movies))

    res.json(movie)
}

module.exports = {getAllMovies,getSingleMovie,addMovie,deleteMovie,updateMovies}


