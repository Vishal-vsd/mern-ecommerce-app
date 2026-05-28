const express = require("express");
const upload = require('../config/multer');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productController");
const protect = require("../middleware/protect");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/create", protect, isAdmin, upload.single("image"), createProduct)
router.put("/update/:id", protect, isAdmin, upload.single("image"), updateProduct)
router.delete("/delete/:productId", protect, isAdmin, deleteProduct)

module.exports =router