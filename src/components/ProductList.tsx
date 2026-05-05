import { useState, useEffect} from "react"
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("FETCH PRODUCTS ERROR", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
                     {Array(8).fill(0).map((_, i) => (
                     <div key={i} className="animate-pulse bg-gray-200 h-60 rounded-lg"></div>
                    ))}
                </div>
             )}
            {!loading && products.map((product: any) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default ProductList