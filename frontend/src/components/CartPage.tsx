import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    updateQuantity
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-500 mt-2">
          Start adding some products!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Shopping Cart
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-4">
          {cart.map((product: any) => (
            <div
              key={product.productId}
              className="flex items-center gap-5 border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >

              <div className="bg-gray-50 p-3 rounded-xl">
                <img
                  src={product.image}
                  className="h-16 w-16 object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-lg font-semibold mt-1 text-gray-900">
                  ${product.price}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decreaseQuantity(
                      product.productId,
                      product.quantity
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                  >
                    −
                  </button>

                  <input type="number" 
                         value={product.quantity}
                         onChange={(e)=> updateQuantity(
                          product.productId,
                          Number(e.target.value))}
                         className="w-12 text-center border rounded"
                  />

                  <button
                    onClick={() => increaseQuantity(
                      product.productId,
                      product.quantity
                    )}
                    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(product.productId)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-2xl p-6 h-fit shadow-sm">

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Items</span>
            <span>{cart.reduce((total:number, item: any) => total + item.quantity, 0)}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <button className="mt-4 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              Proceed to Checkout
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default CartPage;