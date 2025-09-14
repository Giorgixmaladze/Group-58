const express = require("express")
const AppError = require("../utils/appError")

const router = express.Router()

router.get("/", (req, res, next) => {
    res.send("Users route working")
})

router.get("/:id", (req, res, next) => {
    next(new AppError("user not found",404))
})

module.exports = router
