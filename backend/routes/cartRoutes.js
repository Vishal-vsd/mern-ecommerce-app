const express = require("express");
const protect = require("../middleware/protect");
const { getCart, addToCart } = require("../controller/cartController");
const router = express.Router();



router.get("/", protect, getCart)
router.post("/add", protect, addToCart)

module.exports = router