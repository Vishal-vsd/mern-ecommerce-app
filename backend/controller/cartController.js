const User = require("../model/user")
const Product = require("../model/product")

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
            image,
            discount,
            stock
        } = req.body;

        const user = await User.findById(req.user);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const dbProduct = await Product.findById(productId);
        
        if(!dbProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if(dbProduct.stock<=0){
            return res.status(400).json({
                success: false,
                message: "Out of stock"
            })
        }

        const existingProduct = await user.cart.find((item) => item.productId === productId)

        if(existingProduct){
            existingProduct.quantity += 1 
        } else {
            user.cart.push({
                productId: dbProduct._id,
                title: dbProduct.title,
                price: dbProduct.price,
                image: dbProduct.image,
                discount: dbProduct.discount,
                stock: dbProduct.stock,
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

const removeFromCart = async (req, res) => {
    try {

        const user = await User.findById(req.user);

        const productId = req.params.productId;

        user.cart = user.cart.filter(
            (item) => item.productId !== productId
        )

        await user.save();

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

const updateCartQuantity = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        const productId = req.params.productId;

        const { quantity } = req.body;

        const cartItem = user.cart.find(
            (item) => item.productId === productId
        )
        if(!cartItem){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if(quantity <= 0){
            user.cart = user.cart.filter(
                (item) => item.productId !== productId
            )
        } else {
            cartItem.quantity = quantity;
        }

        await user.save()

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

const mergeCart = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user
      );

    const { guestCart } =
      req.body;

    guestCart.forEach(
      (guestItem) => {

        const existingItem =
          user.cart.find(
            (item) =>
              item.productId ===
              guestItem.productId
          );

        if (existingItem) {

          existingItem.quantity +=
            guestItem.quantity;

        }

        else {

          user.cart.push(
            guestItem
          );

        }

      }
    );

    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const clearCart = async (req,res) => {

    try {
        console.log(req.body);
        const user = await User.findById(req.user);

        user.cart = []

        await user.save();

        res.status(200).json({
            success: true,
            cart: []
        }) 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {getCart, addToCart, removeFromCart, updateCartQuantity, mergeCart, clearCart}