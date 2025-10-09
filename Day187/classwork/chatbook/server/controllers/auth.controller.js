


const User = require("../model/users.model");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET, {
    expiresIn:process.env.JWT_EXPIRES_IN
  }) 
};


const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token
  });
};

const signUp = catchAsync(async (req, res) => {
 
    const { name, email, password } = req.body;

    
    const newUser = await User.create({
      name,
      email,
      password,
    });

    const token = signToken(newUser._id);
    createSendToken(newUser,201,res)
    
    newUser.password = undefined;

    res.status(201).json({
      token,
      data: {
        user: newUser,
      },
    })
});


module.exports = {signUp}