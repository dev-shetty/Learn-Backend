import express from "express"
import { createTodos, getTodos } from "../controllers/todoController"
import { authenticate } from "../middleware/authenticate"

const router = express.Router()

router.get("/", authenticate, getTodos)
router.post("/", authenticate, createTodos)

export default router
