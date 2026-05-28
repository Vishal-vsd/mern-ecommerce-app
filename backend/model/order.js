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
        productId: {
          type: String,
          required: true
        },

        title: String,

        price: Number,

        discount: {
          type: Number,
          default: 0
        },

        finalPrice: Number,

        quantity: Number,

        image: {
          url: {type:String, required:true},
          public_id:{type:String, default:""}
        },
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