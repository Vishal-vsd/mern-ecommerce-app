import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
    const {cart, removeFromCart, getTotalPrice} = useContext(CartContext)
    return(
<div className="p-6 max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold mb-6">My Cart</h2>

{cart.length === 0 && (
  <div className="text-center mt-20">
    <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
    <p className="text-gray-500 mt-2">Start adding some products!</p>
  </div>
)}

  {cart.map((product: any) => (
    <div className="flex items-center gap-4 border rounded-lg p-4 mb-4 shadow-sm">

      <img src={product.image} className="h-16 w-16 object-contain" />

      <div className="flex-1">
        <h3 className="text-sm font-medium">{product.title}</h3>
        <p className="font-bold">${product.price}</p>
      </div>

      <button
        onClick={() => removeFromCart(product.id)}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>

    </div>
  ))}

  {cart.length > 0 && (
    <div className="text-right mt-6">
      <h3 className="text-xl font-bold">
        Total: ${getTotalPrice().toFixed(2)}
      </h3>
    </div>
  )}
</div>
    )
}

export default CartPage