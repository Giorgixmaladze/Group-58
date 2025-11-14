const User = require("../model/users.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken")

const protect = async(req,res,next)=>{
    try{
       const token = req.cookies.lt
    // lt-> login token
    // 1) თუ აუთენტიკაციის ტოკენი არ არის გამოგზავნილი ვაბრუნებთ ერორს
    if(!token){
        return next(new AppError("User is not logged in!",401))
    }

    // 2)თუ გამოგვიგზავნეს ტოკენი, მაშინ შევამოწმოთ მისი ვალიდურობა და შემდეგ დეკრიპტაცია

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
        return next(new AppError("token is invalid!",401))
    }

    const user = await User.findById(decoded.id)

    if(!user){
        return next(new AppError("user can not be found",401))
    }
    next() 
    }catch(error){
        console.error("Auth Middleware Error: ", error.message)

        if(error.name==="TokenExpiredError"){
            return next(new AppError("token is expired!"))
        }
    }
    
}

module.exports = protect