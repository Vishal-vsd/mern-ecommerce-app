import { createContext, useEffect, useState, useContext} from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext<any>(null);

type CartItem = {

productId:string;

title:string;

price:number;

discount:number;

stock:number;

image:string;

quantity:number;

}

const CartProvider = (({children} : any) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useContext(AuthContext);
       
    const fetchCart = async (currentUser = user) => {

         try {

            if (currentUser) {

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

    useEffect(() => {

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

                        body:
                        JSON.stringify({

                        productId:
                        product._id,

                        title:
                        product.title,

                        price:
                        product.price,

                        discount:
                        product.discount,

                        stock:
                        product.stock,

                        image:
                        product.image

                        })
                    }
                )

                const data = await res.json()

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
            guestCart.find((item: any) => item.productId === product._id)

            if(existingProduct){
                existingProduct.quantity += 1
            } else {
                    guestCart.push({
                    productId:

                    product._id,

                    title:

                    product.title,

                    price:

                    product.price,

                    discount:

                    product.discount,

                    stock:

                    product.stock,

                    image:

                    product.image,

                    quantity:1
                    })
                 }

            localStorage.setItem("guestCart", JSON.stringify(guestCart))

            setCart(guestCart);

            toast.success("Added to Cart")
        }

    }
    

    const removeFromCart = async (id: string) => {

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

    const updateQuantity = async (id: string, quantity: number) => {
        if(user) {
            try {

                if (isNaN(quantity)) return;

                if (quantity < 0) return;
                
                const res = await fetch(`http://localhost:3000/api/cart/update/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",

                        body: JSON.stringify({
                            quantity
                        })
                    }
                )

                const data = await res.json();

                if(data.success){
                    setCart(data.cart || [])
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const guestCart = JSON.parse(
                localStorage.getItem("guestCart") || "[]"
            )

            const updatedCart = guestCart.map(
                (item: any) => item.productId === id
                ? {
                    ...item,
                    quantity
                }
                :item
            ).filter(
                (item: any) => item.quantity > 0
            )
            
            localStorage.setItem("guestCart", JSON.stringify(updatedCart))

            setCart(updatedCart)
        }
    }

    const increaseQuantity = (id: string, currentQuantity: number)=> {
        updateQuantity(
            id,
            currentQuantity + 1
        )
    }

        const decreaseQuantity = (id: string, currentQuantity: number)=> {
        updateQuantity(
            id,
            currentQuantity - 1
        )
    }
    const getTotalPrice = () => {
        return cart.reduce((total: any, item: any) => 
        { 
            const finalPrice = item.discount > 0
            ? item.price - (item.price * item.discount)/100
            : item.price;

            return (
                total + finalPrice * item.quantity
            )
         }, 0
        )
    }
    return (
        <CartContext.Provider value= {
            {
                cart, 
                addToCart, 
                removeFromCart, 
                increaseQuantity, 
                decreaseQuantity, 
                updateQuantity, 
                getTotalPrice, 
                clearCart, 
                fetchCart
            }
         }> 
        {children}
        </CartContext.Provider>
    )
}) 

export default CartProvider;