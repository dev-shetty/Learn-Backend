import express from "express"
import { createUser, getUser, loginUser } from "../controllers/userController"

const router = express.Router()

router.get("/", getUser)
router.post("/register", createUser)
router.post("/login", loginUser)

export default router
