import express from "express"
import dotenv from "dotenv"
dotenv.config()
const { PORT } = process.env

const app: express.Application = express()

app.get("/", (req, res) => {
  res.send("Hello World!!")
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
