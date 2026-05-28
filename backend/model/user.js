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
    role: {
        type: String,
        enum: ["user", "admin", "guest"],
        default: "user"
    },
    cart: [
            {       
                productId: String,
                title: String,
                price: Number,
                quantity: {
                    type: Number,
                    default: 1
                },
                image: {
                    url: {type:String, required:true},
                    public_id: {type:String, default: ""}
                },
                discount: {
                    type: Number,
                    default: 0
                },
                stock: {
                    type: Number,
                    default: 0
                }
            }
    ]

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)