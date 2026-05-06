import { useState, useEffect} from "react"
import ProductCard from "./ProductCard";

type ProductListProps = {
    searchTerm: string
}
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductList = ({searchTerm}: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const filteredProduct = products.filter((product) => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
            {!loading && filteredProduct.map((product: any) => (
                <ProductCard key={product.id} product={product}/>
            ))}
            {!loading && filteredProduct.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                    No products found
                </p>
                )}
        </div>
    )
}

export default ProductList