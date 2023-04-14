import express from "express"
import {
  createTodos,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController"
import { authenticate } from "../middleware/authenticate"

const router = express.Router()

router.get("/", authenticate, getTodos)
router.post("/", authenticate, createTodos)
router.patch("/:id", authenticate, updateTodo)
router.delete("/:id", authenticate, deleteTodo)

export default router
