const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a name"],
    },
    middleName: String,
    lastName: String,
    gender: {
      type: String,
      required: [true, "Please select gender"],
    },
    mobile: {
      type: String,
      required: [true, "Enter a mobile number"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    timeStamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
