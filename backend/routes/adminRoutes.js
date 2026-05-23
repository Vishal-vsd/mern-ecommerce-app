const express = require("express");
const { getStats, getAllUsers } = require("../controller/adminController");
const protect = require("../middleware/protect");
const {isAdmin} = require("../middleware/adminMiddleware")

const router = express.Router();

router.get("/stats", protect, isAdmin, getStats)
router.get("/users", protect, isAdmin, getAllUsers)
module.exports = router