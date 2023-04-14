import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/UserModel"
import jwt from "jsonwebtoken"
import { RegisterParams, UserInterface, UserCreds } from "../lib/types"

const generateToken = (user: UserInterface) => {
  return jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  })
}

/*
 *  @route - POST /api/v1/user/register
 *  @desc - Create a new user
 *  @access - Public
 *  @params - name*, email*, password*
 */

export const createUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

/*
 *  @route - POST /api/v1/user/login
 *  @desc - Login the user
 *  @access - Public
 *  @params - email*, password*
 */

export const loginUser = async (req: Request, res: Response) => {
  try {
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
      const token = generateToken({
        id: user._id,
        name: user.name,
        email: user.email,
      })

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          success: true,
          id: user._id,
          email: user.email,
          token,
          message: "User logged in",
        })
    }

    return res.status(401).json({
      success: false,
      message: "Incorrect Password",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

/*
 *  @route - GET /api/v1/user
 *  @desc - Gets the current user
 *  @access - Protected
 */

export const getUser = (req: Request, res: Response) => {
  try {
    const { user } = req
    if (user) {
      return res.status(200).json({
        success: true,
        user,
      })
    }

    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

/*
 *  @route - GET /api/v1/user/logout
 *  @desc - Logout the user
 *  @access - Protected
 */

export const logoutUser = (req: Request, res: Response) => {
  // No token check because user has to login to logout
  try {
    return res.clearCookie("access_token").status(200).json({
      success: true,
      message: "User logged out",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    })
  }
}
