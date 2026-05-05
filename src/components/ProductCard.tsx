import { useContext } from "react";
import { CartContext } from "../context/CartContext";



const ProductCard = ({ product }: any) => {
  const {addToCart} = useContext(CartContext)
  return (
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300 flex flex-col">

        <img
          src={product.image}
          className="h-40 object-contain mb-4"
        />

        <h3 className="text-sm font-semibold line-clamp-2">
          {product.title}
        </h3>

        <p className="text-lg font-bold mt-2">
          ${product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-auto bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>

      </div>
  );
};

export default ProductCard