import User from "../models/UserModel"
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { TokenInterface } from "../lib/types"

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Getting the token and also discarding the "Bearer"
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)

    //   Getting the user but without their password
    const user = await User.findById(
      (decodedToken as TokenInterface).user.id
    ).select("-password")

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Request / Token not valid",
    })
  }
}
