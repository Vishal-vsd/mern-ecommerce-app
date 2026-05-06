import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string
}

const ProductDetail = () => {
    const { addToCart } = useContext(CartContext)
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
    if (!id) return; 

    const fetchProduct = async () => {
        try {
        setLoading(true);

        const res = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );

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


    if(loading) {
       return <p>Loading Product...</p>
    }
    if(!product) {
       return <p>Product Not Found</p>
    }
    return(
<div className="p-6 max-w-5xl mx-auto">
      
      {/* 🔙 Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500"
      >
        ← Go Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* 🖼️ Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* 📄 Details */}
        <div>
          <h2 className="text-2xl font-bold">{product.title}</h2>

          <p className="text-gray-500 mt-2">
            Category: {product.category}
          </p>

          <p className="mt-4 text-gray-700">
            {product.description}
          </p>

          <p className="text-2xl font-bold mt-6">
            ${product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
    )
}

export default ProductDetail;