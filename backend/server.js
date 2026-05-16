const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const cartRoutes = require("./routes/cartRoutes.js")
const paymentRoutes = require("./routes/paymentRoutes.js")
const productRoutes = require("./routes/productRoutes.js")

const connectDB = require("./config/db.js")

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API running...")
})

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/products", productRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})