const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();

    const products = await Product.countDocuments();

    const orders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      products,
      users,
      orders,
      revenue: revenue[0]?.totalRevenue || 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSalesAnalytics = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt"
            }
          },
          revenue: {
            $sum: "$totalPrice"
          },
          orders: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          "_id.month": 1
        }
      }
    ]);

    res.status(200).json({
      success:true,
      sales
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("req.user:", req.user);

    console.log("params id:", id);
    if (req.user.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You can't delete yourself",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin account cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["user", "admin"];

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You can't change your own role",
      });
    }

    if (user.role === role) {
      return res.status(400).json({
        success: false,

        message: "User already has this role",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Role changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0,0,0,0);
    
    const recentOrders = await Order.find().sort({
      createdAt: -1,
    }).limit(5)
    .populate(
      "user",
      "name email"
    );

    res.status(200).json({
      success: true,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getStats, getUser, getAllUsers, deleteUser, changeRole, getRecentOrders, getSalesAnalytics};
