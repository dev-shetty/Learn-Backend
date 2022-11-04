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
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    mobile,
    gender,
    passwordConf,
  } = req.body
  if (!firstName || !email || !password || !mobile || !gender) {
    res.status(400)
    throw new Error("Please add all the required fields")
  }
  if (password !== passwordConf) {
    res.status(400)
    throw new Error("Password doesn't match")
  }

  const checkExisting =
    (await User.findOne({ email })) || (await User.findOne({ mobile }))
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

// @desc Login user
// @url POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Fill all the fields")
  }

  const user = await User.findOne({ email })
  console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid Credentials")
  }
})

module.exports = {
  registerUser,
  loginUser,
}
