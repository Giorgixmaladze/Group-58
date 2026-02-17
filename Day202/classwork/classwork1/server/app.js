// მიყევით multer ინსტრუქციას, შექმენით utils ფოლდერში uploadImage.js, სადაც გააკეთებ multer კონფიგურაციას საბოლოოდ კი დაამატეთ ერთი სატესტო ბილიკი მაგ. /upload/img სადაც გამოუყენებთ upload ობიექტის single მეთოდს იმისათის რომ შეგეძლოთ ფოტოს ატვირთვა

const express = require("express");
const path = require("path")
const app = express();
const cors = require("cors");
const upload = require("./utils/uploadImage");


app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.post("/upload/img",upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.send("Image uploaded successfully");
 
}   )

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
