import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const PayementPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const { cart, getTotalPrice, clearCart } = useContext(CartContext);

    const { user, loading } = useContext(AuthContext);

    const [processing, setProcessing] = useState(false);

    const shippingInfo =
        location.state?.shippingInfo;

    useEffect(() => {

        if (!loading && !user) {

            navigate("/login");

        }

    }, [user, loading]);

    useEffect(() => {

        if (!shippingInfo) {

            navigate("/checkout");

        }

    }, [shippingInfo]);

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <p className="text-lg font-medium">
                    Loading...
                </p>

            </div>

        );
    }

    if (!shippingInfo) {

        return null;

    }

    const handlePayment = async () => {
        // debuggeramount: data.order.amount,

        try {


            setProcessing(true);
          
            const res = await fetch("http://localhost:3000/api/payment/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",

                    body: JSON.stringify({
                        amount: getTotalPrice()
                    })
                }
            )

            const data = await res.json();

            if (!data.success) {

                setProcessing(false);
                return;

            }

            const options = {
                key: "rzp_test_SpBbhOWTRku8pa",
                amount: data.order.amount,
                currency: data.order.currency,
                name: "MyStore",
                description: "Test Payment",
                order_id: data.order.id,

                handler: async function (response: any) {

                    const orderRes = await fetch(
                        "http://localhost:3000/api/orders/create",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            credentials: "include",

                            body: JSON.stringify({

                                products: cart.map(
                                    (item: any) => ({
                                        productId: item.productId,
                                        title: item.title,
                                        quantity: item.quantity,
                                        price: item.price,
                                        image: {
                                            url: typeof item.image==="string"
                                            ? item.image
                                            : item.image?.url,
                                            public_id: typeof item.image==="string"
                                            ? ""
                                            : item.image?.public_id || ""
                                        },
                                        discount: item.discount,
                                        finalPrice: item.discount > 0 
                                                    ? item.price - (item.price * item.discount)/100
                                                    : item.price
                                    })
                                ),

                                shippingInfo,

                                totalPrice:
                                    getTotalPrice(),
                            }),
                        }
                    );

                    const orderData = await orderRes.json();

                    if (orderData.success) {
                       
                       await fetch(
                            "http://localhost:3000/api/cart/clear",
                            {
                                method: "DELETE",
                                credentials: "include"
                            }
                        );
                        clearCart()
                        navigate("/success", {
                            replace: true,
                            state: {
                                paid: true
                            }
                        })
                        
                    }
                },
                theme: {
                    color: "#000000"
                }
            }  
            //localStorage.clear();

            const PaymentObject = new (window as any).Razorpay({...options,remember_customer:false})
            PaymentObject.open()
            setProcessing(false)


        } catch (error) {

            console.log(error);

            setProcessing(false);

        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden">

                {/* TOP HEADER */}
                <div className="bg-black text-white px-8 py-7">

                    <h2 className="text-3xl font-bold">
                        Secure Checkout
                    </h2>

                    <p className="text-gray-300 mt-2 text-sm">
                        Complete your payment safely with Razorpay
                    </p>

                </div>

                <div className="p-8">


                    {/* ORDER SUMMARY */}
                    <div className="border border-gray-200 rounded-3xl p-5 mb-6">

                        <h3 className="text-xl font-semibold mb-5">
                            Order Summary
                        </h3>

                        <div className="space-y-4">

                            {cart.map((item: any) => (

                                <div
                                    key={item.productId}
                                    className="flex items-center justify-between"
                                >

                                    <div className="flex items-center gap-3">

                                        <img
                                            src={typeof item.image==="string"
                                                ? item.image
                                                : item.image?.url
                                            }
                                            alt={item.title}
                                            className="w-14 h-14 object-contain bg-gray-50 rounded-xl p-2"
                                        />

                                        <div>

                                            <p className="font-medium text-gray-800 line-clamp-1">
                                                {item.title}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="text-right">

                                    <p className="font-semibold text-gray-900">

                                    ₹{
                                    (
                                    item.discount >0
                                    ? item.price - ( item.price * item.discount)/100
                                    : item.price
                                )

                                    *

                                    item.quantity

                                    }

                                    </p>

                                    {

                                    item.discount >0 && (

                                    <p className="

                                    text-xs

                                    text-gray-400

                                    line-through">

                                    ₹{

                                    item.price *

                                    item.quantity

                                    }

                                    </p>

                                    )

                                    }

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* TOTAL */}
                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Amount
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900">
                                ₹{getTotalPrice().toFixed(2)}
                            </h2>

                        </div>

                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium">
                            Secure
                        </div>

                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:opacity-50"
                    >

                        {processing
                            ? "Processing..."
                            : `Pay Securely ₹${getTotalPrice().toFixed(2)}`
                        }

                    </button>

                </div>

            </div>

        </div>
    );
}

export default PayementPage;
