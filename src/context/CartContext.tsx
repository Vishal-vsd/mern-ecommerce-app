import { createContext, useState } from "react";

export const CartContext = createContext<any>(null);

const CartProvider = (({children} : any) => {
    const [cart, setCart] = useState<any[]>([]);

    const addToCart = (product: any) => {
        setCart((prev) => [...prev, product])
    }

    const removeFromCart = (id: any) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0)
    }
    return (
        <CartContext.Provider value= {{cart, addToCart, removeFromCart, getTotalPrice}}> 
        {children}
        </CartContext.Provider>
    )
}) 

export default CartProvider;