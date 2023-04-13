import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/UserModel"
import { RegisterParams, UserCreds } from "../lib/types"

/*
 *  @route - GET /api/v1/user
 *  @desc - Get the user
 *  @access - Public (for now)
 */

export const getUser = (req: Request, res: Response) => {
  res.send("Hello User")
}

/*
 *  @route - POST /api/v1/user/register
 *  @desc - Create a new user
 *  @access - Public
 *  @params - name*, email*, password*
 */

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password }: RegisterParams & UserCreds = req.body

  if (!name || !email || !password) {
    throw new Error("Fill all the required details")
  }

  // Checking if user already has an account while registering
  const isUserRegistered = await User.findOne({ email: email })
  if (isUserRegistered) {
    return res.status(409).json({
      success: false,
      message: "Email already registered, please login",
    })
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  })
  if (!user) {
    return res.status(400).json({
      success: false,
      message:
        "Unable to register user, please check the details and try again",
    })
  }

  return res.status(200).json({
    success: true,
    id: user._id,
    email: user.email,
    message: "User has been registered",
  })
}

/*
 *  @route - POST /api/v1/user/login
 *  @desc - Login the user
 *  @access - Public
 *  @params - email*, password*
 */

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: UserCreds = req.body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Fill all the required details",
    })
  }

  const user = await User.findOne({ email: email })
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not registered, please register",
    })
  }

  if (await bcrypt.compare(password, user.password)) {
    return res.status(200).json({
      success: true,
      id: user._id,
      email: user.email,
      message: "User logged in",
    })
  }

  return res.status(401).json({
    success: false,
    message: "Incorrect Password",
  })
}
