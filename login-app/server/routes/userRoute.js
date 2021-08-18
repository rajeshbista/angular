const express = require("express")
const { getAllUsers, registerUser, validateLogin } = require("../controller/userController")
const router = express.Router()

router.get("/getAllUsers", getAllUsers)
router.post("/signUpUser", registerUser)
router.post("/loginCheck", validateLogin)

module.exports = router 