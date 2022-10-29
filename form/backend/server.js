const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const connectDB = require("./config/db")

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use("/", require("./routes/userRoutes"))

app.listen(port, () => {
  console.log("Server Started at Port 5000")
})
