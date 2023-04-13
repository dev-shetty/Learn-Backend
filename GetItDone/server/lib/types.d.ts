import { ObjectId } from "mongodb"

export interface UserCreds {
  email: string
  password: string
}

export interface RegisterParams {
  name: string
}

export interface UserProps {
  id: ObjectId
  name: string
  email: string
}
