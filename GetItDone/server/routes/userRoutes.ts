import express from "express"
import { createUser, getUser } from "../controllers/userController"

const router = express.Router()

router.get("/", getUser)
router.post("/", createUser)

export default router
