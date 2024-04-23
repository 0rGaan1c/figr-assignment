const mongoose = require("mongoose");
const validator = require("validator");
const {
  requiredErrorMessage,
  minLengthErrorMessage,
  maxLengthErrorMessage,
} = require("../utils");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, requiredErrorMessage("Name")],
    maxlength: [50, maxLengthErrorMessage(50, "Name")],
  },
  email: {
    type: String,
    unique: true,
    required: [true, requiredErrorMessage("Email")],
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email.",
    },
  },
  password: {
    type: String,
    required: [true, requiredErrorMessage("Password")],
    minlength: [6, minLengthErrorMessage(6, "Password")],
  },
});

module.exports = mongoose.model("User", UserSchema);
