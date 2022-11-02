const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

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
    (await User.findOne({ email: email })) || User.findOne({ mobile: mobile })
  if (checkExisting) {
    res.status(401)
    throw new Error("User already exists.... log in")
  }
  const user = await User.create(req.body)
  if (user) {
    res.status(200).json({
      id: user.id,
      name: `${firstName} ${middleName} ${lastName}`,
      email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

module.exports = {
  registerUser,
}
