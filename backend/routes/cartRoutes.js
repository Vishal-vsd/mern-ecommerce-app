const express = require("express");
const protect = require("../middleware/protect");
const { getCart, addToCart, removeFromCart, updateCartQuantity } = require("../controller/cartController");
const router = express.Router();



router.get("/", protect, getCart)
router.post("/add", protect, addToCart)
router.delete("/remove/:productId", protect, removeFromCart)
router.put("/update/:productId", protect, updateCartQuantity)
module.exports = router