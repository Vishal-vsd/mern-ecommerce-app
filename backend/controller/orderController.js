const Order = require("../model/order");

const createOrder = async(req, res) => {
    try {
        const {products, shippingInfo, totalPrice} = req.body;

        const order = await Order.create({
            user: req.user,
            products,
            shippingInfo,
            totalPrice
        })

        res.status(201).json({
            success: true,
            message: "Order placed successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { createOrder }