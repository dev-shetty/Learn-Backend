import { ObjectId } from "mongodb"
import UserModel from "../models/UserModel"

export interface UserCreds {
  email: string
  password: string
}

export interface RegisterParams {
  name: string
}

export interface UserInterface {
  id: ObjectId
  name: string
  email: string
}

export interface TokenInterface {
  user: UserInterface
}

export interface FilterQuery {
  user: UserModel
  isCompleted?: boolean
}
