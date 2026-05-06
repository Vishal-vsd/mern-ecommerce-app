import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col group">

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="flex justify-center items-center h-44 mb-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {product.title}
        </h3>
      </Link>

      {/* Price */}
      <p className="text-xl font-semibold mt-3 text-gray-900">
        ${product.price}
      </p>

      {/* Button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-black text-white py-2.5 rounded-xl hover:bg-gray-900 transition-all duration-300 tracking-wide text-sm"
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;