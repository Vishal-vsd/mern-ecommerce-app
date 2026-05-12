const express = require("express");

const router = express.Router();

const protect = require("../middleware/protect")

const {createOrder} = require("../controller/orderController");


router.post("/create", protect, createOrder);

module.exports = router

