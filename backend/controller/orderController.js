const Order = require("../model/order");
const Product = require("../model/product")

const createOrder = async(req, res) => {
    try {
        const {products, shippingInfo, totalPrice} = req.body;

        const order = await Order.create({
            user: req.user,
            products,
            shippingInfo,
            totalPrice
        })

        for (const item of products) {
            const product = await Product.findById(item.productId);

            if(product) {
                product.stock -= item.quantity;

                await product.save();
            }
        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user,
        }).sort({createdAt: -1})

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getOrders = async(req, res) => {
    try {
        const orders = await Order.find()
        .populate(
            "user",
            "name email"
        ).sort({
            createdAt: -1
        })

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getOrder = async (req, res) => {
    try {
        const {id} = req.params;

        const order = await Order.findById(id).populate(
            "user",
            "name email"
        )

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateOrderStatus = async(req, res) => {
    try {
        const {id} = req.params;

        const {status} = req.body;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Status updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { createOrder, getMyOrders, getOrders, getOrder, updateOrderStatus
 }