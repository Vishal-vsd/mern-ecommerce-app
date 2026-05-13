import { createContext, useEffect, useState, useContext} from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext<any>(null);

type CartItem = {
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

const CartProvider = (({children} : any) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useContext(AuthContext);

        useEffect(() => {

        const fetchCart = async () => {

            try {

            // no logged in user
            if (!user) {

                setCart([]);

                return;

            }

            const res = await fetch(
                "http://localhost:3000/api/cart",
                {
                credentials: "include",
                }
            );

            const data = await res.json();

            if (data.success) {

                setCart(data.cart || []);

            }

            } catch (error) {

            console.log(error);

            }
        };

        fetchCart();

        }, [user]);

    const addToCart = async (product: any) => {
        try {

            const res = await fetch("http://localhost:3000/api/cart/add",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    }, 
                    credentials: "include",

                    body: JSON.stringify({
                        productId: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image
                    })
                }
            )

            const data = await res.json()
            console.log(data)

            if(data.success){
                setCart(data.cart || []);
                toast.success("Added to cart")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const removeFromCart = (id: any) => {
        setCart((prev: CartItem[]) => prev.filter((item) => item.id !== id))
    }

    const clearCart = () => {
        setCart([])
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
        <CartContext.Provider value= {{cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity, getTotalPrice, clearCart}}> 
        {children}
        </CartContext.Provider>
    )
}) 

export default CartProvider;