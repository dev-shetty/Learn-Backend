const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

// Generate jwt token
const generateToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1y",
  })
}

// @desc Register user
// @url POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, middleName, lastName, email, password, mobile, gender } =
    req.body
  if (!firstName || !email || !password || !mobile || !gender) {
    res.status(400)
    throw new Error("Please add all the required fields")
  }

  const checkExisting =
    (await User.findOne({ email: email })) ||
    (await User.findOne({ mobile: mobile }))
  if (checkExisting) {
    res.status(401)
    throw new Error("User already exists.... log in")
  }
  // Hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name: `${firstName} ${middleName} ${lastName}`,
    mobile,
    gender,
    email,
    password: hashedPassword,
  })
  if (user) {
    res.status(200).json({
      id: user.id,
      name: `${firstName} ${middleName} ${lastName}`,
      email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

module.exports = {
  registerUser,
}
