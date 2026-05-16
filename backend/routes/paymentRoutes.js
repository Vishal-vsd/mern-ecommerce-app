const express = require("express");
const protect = require("../middleware/protect");
const { createPaymentOrder } = require("../controller/paymentController");

const router = express.Router();



router.post("/create-order", protect, createPaymentOrder)

module.exports = router