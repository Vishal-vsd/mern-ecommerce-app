const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: Number,

        title: String,

        price: Number,

        quantity: Number,

        image: String,
      },
    ],

    shippingInfo: {

      fullName: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      phone: {
        type: Number,
        required: true,
      },

    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Processing",
    },

  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  OrderSchema
);