const express = require("express");

const router = express.Router();

const protect = require("../middleware/protect")

const {createOrder, getMyOrders, getOrders, getOrder} = require("../controller/orderController");
const { isAdmin } = require("../middleware/adminMiddleware");


router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders)
router.get("/", protect, isAdmin, getOrders);
router.get("/:id", protect, isAdmin, getOrder);

module.exports = router

