import express from "express"
import { getTodos } from "../controllers/todoController"

const router = express.Router()

router.get("/", getTodos)

export default router
