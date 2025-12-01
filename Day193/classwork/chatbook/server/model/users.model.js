const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  role:{
    type:String
  },
  password: {
    type:String,
    required:[true,"Password is required"],
    minLength:[6,"Password must be at least 6 characters"],
    select:false
  },
});


userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();


  this.password = await bcrypt.hash(this.password, 12);
  next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;