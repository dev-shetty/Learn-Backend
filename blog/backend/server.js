const express = require("express")
const dotenv = require("dotenv").config()

const port = process.env.PORT || 5000

const app = express()

app.use("/", (req, res) => {
  res.status(200).json("Hello")
})

app.listen(port, console.log("Server started at port 5000"))
