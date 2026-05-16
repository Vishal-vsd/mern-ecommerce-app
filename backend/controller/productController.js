const Product = require("../model/product");

const getProducts = async (req,res) => {
    try {
        const products = await Product.find()

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            product
        })
        
    } catch (error) {
            res.status(500).json({
            success: false,
            message: error.message
        })  
    }
}

const createProduct = async (req, res) => {
    try {
        const {
            title,
            price,
            description,
            discount,
            category,
            image,
            stock,

        } = req.body;

        if(
            !title ||
            !price ||
            !description ||
            !image ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill required fields"
            })
        }

        const product = await Product.create({
            price,
            title,
            description,
            image,
            category,
            discount,
            stock,
        })

        res.status(201).json({
            success: true,
            message: "Product created",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct = async (req,res) => {
    try {
        const {id} = req.params;
        
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json({
            success: true,
            message: "Product details updated successfully!",
            product: updatedProduct,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct}