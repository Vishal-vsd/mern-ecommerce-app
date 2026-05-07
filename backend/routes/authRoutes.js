const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const router = express.Router()
const protect = require("../middleware/protect")

router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router;