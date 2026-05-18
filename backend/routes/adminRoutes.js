const express = require("express");
const { getStats } = require("../controller/adminController");
const protect = require("../middleware/protect");
const {isAdmin} = require("../middleware/adminMiddleware")

const router = express.Router();

router.get("/stats", protect, isAdmin, getStats)

module.exports = router