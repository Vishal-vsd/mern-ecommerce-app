import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext<any>(null);

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

const CartProvider = (({children} : any) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(()=> {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: any) => {
        setCart((prev: CartItem[]) => {
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
              toast.success("Added to Cart")
    }

    const removeFromCart = (id: any) => {
        setCart((prev: CartItem[]) => prev.filter((item) => item.id !== id))
    }

    const increaseQuantity = (id: any) => {
        setCart((prev: CartItem[]) => 
            prev.map((item)=> 
                item.id===id
            ? {...item, quantity: item.quantity +1 }
            : item
        )
        )
    }

    const decreaseQuantity = (id: any) => {
        setCart((prev: CartItem[]) => 
            prev.map((item)=> 
            item.id === id
        ? {...item, quantity: item.quantity - 1}
        : item
    ).filter((item) => item.quantity > 0)
        )
    }

    const updateQuantity = (id: number, quantity: number) => {
        if(quantity<=0) return
        setCart((prev: CartItem[]) => 
            prev.map((item) => 
            item.id === id ? {...item, quantity} : item
            )
        )
    }
    const getTotalPrice = () => {
        return cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0)
    }
    return (
        <CartContext.Provider value= {{cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity, getTotalPrice}}> 
        {children}
        </CartContext.Provider>
    )
}) 

export default CartProvider;