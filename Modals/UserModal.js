const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your name.'],
    maxLength: [30, 'Name must be at most 30 characters long.'],
    unique: true,
    minLength: [4, 'Name must be at least 4 characters long.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password.'],
    minLength: [8, 'password must be at least 8 characters long.'],
    select: false
  }
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcryptjs.genSalt(8)
  this.password = await bcryptjs.hash(this.password, salt)
  next()
})

//JWT TOKEN
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

//Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}

module.exports.modal = mongoose.model('User', UserSchema, 'users')