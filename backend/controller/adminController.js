const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

const getStats = async (req, res) => {
    try {
        const users = await User.countDocuments();

        const products = await Product.countDocuments();

        const orders = await Order.countDocuments();

        res.status(200).json({
            success: true,
            products,
            users,
            orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if(users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            })
        }

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getStats, getAllUsers} 