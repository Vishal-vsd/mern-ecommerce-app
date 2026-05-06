import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-black transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div className="flex justify-center bg-gray-50 p-8 rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        <div>

          <p className="text-sm text-gray-400 uppercase tracking-wide">
            {product.category}
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-2 leading-tight">
            {product.title}
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <p className="text-3xl font-bold text-gray-900 mt-6">
            ${product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition duration-300 tracking-wide"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;