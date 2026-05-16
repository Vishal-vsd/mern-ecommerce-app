const express = require("express");
const { getProducts, getProductById, createProduct, updateProduct } = require("../controller/productController");
const protect = require("../middleware/protect");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/create", protect, isAdmin, createProduct)
router.put("/update/:id", protect, isAdmin, updateProduct)

module.exports =router