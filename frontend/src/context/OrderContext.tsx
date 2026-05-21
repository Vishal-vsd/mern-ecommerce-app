import { createContext, useState } from "react";


export const OrderContext = createContext<any>(null);

type Order = {

_id:string;
user: {
    _id: string,
    name: string,
    email: string
}

products:{

    productId:string;
    title:string;
    price:number;
    discount:number;
    finalPrice:number;
    quantity:number;
    image:string;

}[];

shippingInfo:{

    fullName:string;
    address:string;
    city:string;
    phone:number;

};

totalPrice:number;
status:string;

createdAt:string;
updatedAt:string;

}

const OrderProvider = ({children}: any) => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);

    const [order, setOrder] = useState<Order | null>(null)

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/orders",
                {
                    credentials: "include"
                }
            )

            const data = await res.json();

            if(data.success){
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchOrder = async(id:string) => {
        try {
            setLoading(true);

            const res = await fetch(`http://localhost:3000/api/orders/${id}`,
                {
                    credentials: "include"
                }
            )

            const data = await res.json();

            if(data.success){
                setOrder(data.order);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <OrderContext.Provider value={
            {
                orders,
                fetchOrders,
                loading,
                setOrders,
                order,
                fetchOrder
            }
        }>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;