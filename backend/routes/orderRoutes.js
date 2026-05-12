const express = require("express");

const router = express.Router();

const protect = require("../middleware/protect")

const {createOrder, getMyOrders} = require("../controller/orderController");


router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders)

module.exports = router

