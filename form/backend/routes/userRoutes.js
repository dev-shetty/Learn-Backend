const express = require("express")
const router = express.Router()

const { loginUser } = require("../controller/userController")

router.get("/", loginUser)

module.exports = router
