const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;