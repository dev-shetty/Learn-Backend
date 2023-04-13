import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import userRouter from "./routes/userRoutes"
import todoRouter from "./routes/todoRoutes"

const app: express.Application = express()
dotenv.config()
const { PORT } = process.env

// Adding middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connecting to database
connectDB()

app.get("/", (req, res) => {
  res.send("Hello World!!")
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/todo", todoRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
