const User = require("../model/user")

const getCart = async(req, res) => {
    try {
        const user = await User.findById(req.user);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            cart: user.cart
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addToCart = async(req, res) => {
    try {
        const {
            productId,
            price,
            title,
            image
        } = req.body;

        const user = await User.findById(req.user);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const existingProduct = await user.cart.find((item) => item.productId === productId)

        if(existingProduct){
            existingProduct.quantity += 1 
        } else {
            user.cart.push({
                productId,
                title,
                price,
                image,
                quantity: 1
            })
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart: user.cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {getCart, addToCart}