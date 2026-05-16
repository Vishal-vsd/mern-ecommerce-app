import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

type Product = {

 _id:string,

 title:string,

 price:number,

 description:string,

 image:string,

 category:string,

 discount:number,

 stock:number

}

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setProduct(data.product);

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

  const discountedPrice =
    product.discount > 0
      ? product.price -
        (product.price * product.discount) / 100
      : product.price;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-black transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div className="relative flex justify-center bg-gray-50 p-8 rounded-2xl">
          {

            product.discount >0 && (

            <span className=" absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-50">

            {product.discount}% OFF

            </span>

            )

            }
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
            ₹{discountedPrice.toFixed(0)}
          </p>
          {
            product.discount >0 &&(

            <p className="
            line-through
            text-gray-400">

            ₹{product.price}

            </p>

            )

            }
            <p
              className={`mt-3 text-sm font-medium
              ${
                product.stock === 0
                  ? "text-red-500"
                  : product.stock < 5
                  ? "text-orange-500"
                  : "text-green-600"
              }`}
            >
              {
                product.stock === 0
                  ? "Out of stock"
                  : product.stock < 5
                  ? `Only ${product.stock} left`
                  : "In stock"
              }
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