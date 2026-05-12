import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const PayementPage = ()=> {
    const location = useLocation();
    const navigate = useNavigate();

    const shippingInfo = location.state?.shippingInfo;

    if(!shippingInfo){
        navigate("/checkout");
        return null;
    }

    const { cart, getTotalPrice, clearCart } = useContext(CartContext);

    const [processing, setProcessing] = useState(false);

    const handlePayment = async () => {

        try {

            setProcessing(true);

            setTimeout(async () => {

            try {

                const res = await fetch(
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
                        productId: item.id,
                        title: item.title,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.image,
                        })
                    ),

                    shippingInfo,

                    totalPrice:
                        getTotalPrice(),
                    }),
                }
                );

                const data = await res.json();

                if (data.success) {

                clearCart();

                navigate("/success");

                }

            } catch (error) {

                console.log(error);

            } finally {

                setProcessing(false);

            }

            }, 2000);

        } catch (error) {

            console.log(error);

            setProcessing(false);

        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

            <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-8 border border-gray-100">

            <h2 className="text-3xl font-bold text-center mb-2">
                Payment
            </h2>

            <p className="text-center text-gray-500 mb-8">
                Complete your payment
            </p>

            {/* Fake Card */}
            <div className="space-y-4">

                <input
                type="text"
                placeholder="Card Number"
                className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                />

                <div className="grid grid-cols-2 gap-4">

                <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                />

                <input
                    type="text"
                    placeholder="CVV"
                    className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                />

                </div>

            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-8 mb-6">

                <span className="text-gray-600">
                Total
                </span>

                <span className="text-2xl font-bold">
                ${getTotalPrice().toFixed(2)}
                </span>

            </div>

            {/* Button */}
            <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition disabled:opacity-50"
            >

                {processing
                ? "Processing Payment..."
                : "Pay Now"}

            </button>

            </div>

        </div>
        );
}

export default PayementPage;
