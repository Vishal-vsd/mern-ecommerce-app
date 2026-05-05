import { createContext, useState } from "react";

export const CartContext = createContext<any>(null);

const CartProvider = (({children} : any) => {
    const [cart, setCart] = useState<any[]>([]);

    const addToCart = (product: any) => {
        setCart((prev: any) => {
            const existingProduct = prev.find((item: any)=> item.id === product.id);
            if(existingProduct){
                return prev.map((item: any)=> 
                item.id === product.id
                ? {...item, quantity: item.quantity + 1}
                : item
                )
            }
            return [...prev, {...product, quantity: 1}]
        })
    }

    const removeFromCart = (id: any) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
    return (
        <CartContext.Provider value= {{cart, addToCart, removeFromCart, getTotalPrice}}> 
        {children}
        </CartContext.Provider>
    )
}) 

export default CartProvider;