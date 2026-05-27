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

const getUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if(req.user.toString() === id){
            return res.status(400).json({
                success: false,
                message: "You can't delete yourself"
            })
        }

        if(user.role === "admin"){
            return res.status(400).json({
                success: false,
                message: "Admin account cannot be deleted"
            })
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = { getStats, getUser, getAllUsers, deleteUser} 