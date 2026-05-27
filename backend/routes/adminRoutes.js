const express = require("express");
const { getStats, getAllUsers, deleteUser, getUser } = require("../controller/adminController");
const protect = require("../middleware/protect");
const {isAdmin} = require("../middleware/adminMiddleware");


const router = express.Router();

router.get("/stats", protect, isAdmin, getStats)
router.get("/users", protect, isAdmin, getAllUsers)
router.delete("/delete/:id", protect, isAdmin, deleteUser)
router.get("/users/:id", protect, isAdmin, getUser)
module.exports = router