const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db.js")

const app = express();

connectDB();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API running...")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})