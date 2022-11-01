const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const connectDB = require("./config/db")

connectDB()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", require("./routes/userRoutes"))

app.listen(port, () => {
  console.log("Server Started at Port 5000")
})
