import { useState, useEffect} from "react"
import ProductCard from "./ProductCard";

type ProductListProps = {
    searchTerm: string,
    category: string
    sortOption: string
}
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

const ProductList = ({searchTerm, category, sortOption}: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const filteredProducts = products.filter((product) => {
       const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
       const matchesCategory = category === "all" || product.category === category

       return matchesSearch && matchesCategory
})

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

    const sortedProducts = [...filteredProducts];
    if(sortOption === "low"){
        sortedProducts.sort((a,b)=> a.price - b.price)
    } 
    if(sortOption === "high"){
        sortedProducts.sort((a,b)=> b.price - a.price)
    }

    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
                     {Array(8).fill(0).map((_, i) => (
                     <div key={i} className="animate-pulse bg-gray-200 h-60 rounded-lg"></div>
                    ))}
                </div>
             )}
            {!loading && sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
            {!loading && filteredProducts.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                    No products found
                </p>
                )}
        </div>
    )
}

export default ProductList