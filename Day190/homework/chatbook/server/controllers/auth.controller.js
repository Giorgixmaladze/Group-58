


const User = require("../model/users.model");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const signToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET, {
    expiresIn:process.env.JWT_EXPIRES_IN || "7d"
  }) 
};
 



// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id,user.password);

//   const cookieOptions = {
//     expires: new Date(Date.now() + ms(process.env.JWT_COOKIE_EXPIRES_IN)),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//   };

//   res.cookie("jwt", token, cookieOptions);
//   user.password = undefined;

//   res.status(statusCode).json({
//     status: "success",
//     token,
//   });
// };



const createSendToken = (user,statusCode,res) =>{
  const token = signToken(user._id)
  
  // Convert COOKIE_EXPIRES_IN from days to milliseconds
  const cookieExpiresIn = parseInt(process.env.COOKIE_EXPIRES_IN || "7") * 24 * 60 * 60 * 1000;

   res.cookie("lt",token,{
    maxAge: cookieExpiresIn,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "Lax"
   })

   user.password = undefined;

   res.status(statusCode).json({
        status: "success",
        token,
        data: {
          user
        }
      });
}
// პირველი და ყველაზე მთავარი აქ გვაქვს უსაფრთხოების პრობლემა, პაროლთან დაკავშირებით

const signUp = catchAsync(async (req, res) => {
 
    const { name, email, password } = req.body;
   
    
    const newUser = await User.create({
      name,
      email,
      password
    });

    createSendToken(newUser, 201, res);
});



// შეიქმნა login კონტროლერი სადაც ხდება შეყვანილი ინფორმაციის შემოწმება ავთენთიკაციის დროს, ვიპოვით კონკრეტული მეილით მონაცემებს  და შემდეგ ვამოწმებთ პაროლსაც comparePassword მეთოდის გამოყენებით, სადაც ჰეშირებული პაროლი გარდაიქმნება ისევ ჩვეულებრივ პაროლად და შევადარებთ ავთენთიკაციის დროს შეყვანილ პაროლს,თუ დაემთხვა მომხმარებელი ავთენთიკაციას წარმატებით გაივლის

const logIn = catchAsync( async (req,res,next) =>{
    const {email,password} = req.body

    const user = await User.findOne({email}).select("+password")

    if(!user){
      return next( new AppError("email or password incorrect",404))
    }

    const isCorrect = await user.comparePassword(password,user.password)

    if(!isCorrect){
      return next( new AppError("email or password incorrect",404))
    }

    createSendToken(user, 200, res);
})


module.exports = {signUp,logIn}