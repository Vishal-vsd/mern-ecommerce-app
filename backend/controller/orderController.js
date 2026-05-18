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

module.exports = { createOrder, getMyOrders }