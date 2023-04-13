import express from "express"
import { createUser, getUser, loginUser } from "../controllers/userController"
import { authenticate } from "../middleware/authenticate"

const router = express.Router()

router.get("/", authenticate, getUser)
router.post("/register", createUser)
router.post("/login", loginUser)

export default router
