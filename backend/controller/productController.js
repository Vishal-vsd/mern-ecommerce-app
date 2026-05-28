const Product = require("../model/product");
const User = require("../model/user");
const cloudinary = require("../config/cloudinary");
const streamifire = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        transformation: [{ width: 800, quality: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    streamifire.createReadStream(buffer).pipe(stream);
  });
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, price, description, discount, category, stock } = req.body;

    console.log("req.file:", req.file);        // file aa rahi hai ya nahi
        console.log("req.body:", req.body); 

    if (!title || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields",
      });
    }

    let image = { url: "", public_id: "" };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } else if (req.body.image) {
      image = {
        url: req.body.image,
        public_id: "",
      };
    } else {
      return res.status(400).json({
        success: false,
        message: "Please provide an image",
      });
    }

    const product = await Product.create({
      price,
      title,
      description,
      image,
      category,
      discount,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let image = product.image;
    if (req.file) {
      if (product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      const result = await uploadToCloudinary(req.file.buffer);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } else if (req.body.image) {
      if (product.image.public_id) {
        cloudinary.uploader.destroy(product.image.public_id);
      }

      image = {
        url: req.body.image,
        public_id: "",
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title: req.body.title || product.title,
        price: req.body.price || product.price,
        description: req.body.description || product.description,
        category: req.body.category || product.category,
        discount: req.body.discount ?? product.discount,
        stock: req.body.stock ?? product.stock,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Product details updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
