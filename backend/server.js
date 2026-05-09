const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes.js")
const protect = require("./middleware/protect.js")

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
app.get("/protected", protect, (req, res) => {

  res.json({
    success: true,
    message: "Protected route accessed",
    userId: req.user,
  });

});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})