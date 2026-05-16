import { createContext, useState } from "react"

export const ProductContext = createContext<any>(null);

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

const ProductProvider = ({children}: any) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product | null>(null)
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {

            setLoading(true);
            const res = await fetch("http://localhost:3000/api/products");
            const data = await res.json();
            setProducts(data.products);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchProduct = async (id: string) => {
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
}
     return (
        <ProductContext.Provider value ={
        {
            loading,
            fetchProducts,
            products,
            setProducts,
            product,
            fetchProduct
        }
        }>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;