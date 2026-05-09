const express = require("express");
const { registerUser, loginUser, logoutUser, getCurrentUser } = require("../controller/authController");
const router = express.Router()
const protect = require("../middleware/protect")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", protect, logoutUser)
router.get("/me", protect, getCurrentUser)

module.exports = router;


