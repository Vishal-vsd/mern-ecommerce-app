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

            if (user) {

            const res = await fetch(
                "http://localhost:3000/api/cart",
                {
                credentials: "include",
                }
            );

            const data = await res.json();

            if (data.success) {

                setCart(
                    Array.isArray(data.cart)
                    ? data.cart
                    : []
                
                );
            } 

            } else {

                const guestCart = JSON.parse(
                    localStorage.getItem("guestCart") || "[]"
                )

                setCart(guestCart);
            }

            } catch (error) {

            console.log(error);

            }
        };

        fetchCart();

        }, [user]);

    const addToCart = async (product: any) => {

        if(user) {        
            
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
        } else {
            const guestCart = JSON.parse(
                localStorage.getItem("guestCart") || "[]"
            )

            const existingProduct = 
            guestCart.find((item: any) => item.productId === product.id)

            if(existingProduct){
                existingProduct.quantity += 1
            } else {
                    guestCart.push({
                        productId: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        quantity:  1
                    })
                 }

            localStorage.setItem("guestCart", JSON.stringify(guestCart))

            setCart(guestCart);

            toast.success("Added to Cart")
        }

    }
    

    const removeFromCart = async (id: any) => {

        if(user) {
            try {
                    const res = await fetch(`http://localhost:3000/api/cart/remove/${id}`,
                        {
                            method: "DELETE",
                            credentials: "include"
                        }
                    )

                    const data = await res.json();

                    if(data.success) {

                        setCart(data.cart || []);

                        toast.success("Removed from Cart");
                    }
            } catch (error) {
                console.log(error)
            }
        } else {
            const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")

            const updatedCart = guestCart.filter(
                (item: any) => item.productId !== id
            )

            localStorage.setItem("guestCart", JSON.stringify(updatedCart))

            setCart(updatedCart);

            toast.success("Removed from Cart")
        }
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