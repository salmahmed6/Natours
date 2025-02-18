const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//name, email, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: 'string',
    required: [true, 'Please provide your email'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  password: {
    type: 'string',
    required: [true, 'Please provide a password'],
    minlength: 8,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: String,
  password: {
    type: String,
    select: false,
    required: [true, 'Please provide a password'],
    minlength: 8,
    validate: [
      validator.isStrongPassword,
      'Password should be at least 8 characters long, contain a uppercase letter, a lowercase letter, a number, and a special character',
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hash the password with the new password
  this.password = await bcrypt.hash(this.password, 11);

  //delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
