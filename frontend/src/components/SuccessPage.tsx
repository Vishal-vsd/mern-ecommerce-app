import { Link } from "react-router-dom";

const OrderSuccessPage = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 text-center border border-gray-100">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 text-4xl mb-6">
          ✓
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Order Successful
        </h2>

        {/* Description */}
        <p className="text-gray-500 leading-relaxed">
          Thank you for your purchase.
          Your order has been placed successfully.
        </p>

        {/* Order Info */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-4 text-sm text-gray-600">

          <p>
            Estimated delivery:
          </p>

          <p className="font-semibold text-gray-900 mt-1">
            3 - 5 Business Days
          </p>

        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">

          <Link to="/">
            <button className="w-full bg-black text-white py-3 mb-2 rounded-2xl hover:bg-gray-800 transition">
              Continue Shopping
            </button>
          </Link>

          <Link to="/cart">
            <button className="w-full border border-gray-300 py-3 rounded-2xl hover:bg-gray-100 transition">
              View Cart
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccessPage;