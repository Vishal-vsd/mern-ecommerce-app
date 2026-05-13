const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    cart: [
            {       
                productId: Number,
                title: String,
                price: Number,
                quantity: Number,
                image: String
            }
    ]

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)