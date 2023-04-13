import UserModel from "../../server/models/UserModel"

declare global {
  namespace Express {
    interface Request {
      user: UserModel
    }
  }
}
