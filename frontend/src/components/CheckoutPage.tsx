import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {

    const {cart, getTotalPrice} = useContext(CartContext);

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    }, [user])

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const handlePlaceOrder = async () => {

  try {

    const res = await fetch(
      "http://localhost:3000/api/orders/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({

          products: cart.map((item: any) => ({
            productId: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),

          shippingInfo: {
            fullName,
            address,
            city,
            phone,
          },

          totalPrice: getTotalPrice(),
        }),
      }
    );

    const data = await res.json();

    if (data.success) {

      navigate("/success");

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

  }
};


return (
  <div className="max-w-6xl mx-auto px-6 py-10">

    <h2 className="text-3xl font-bold mb-8">
      Checkout
    </h2>

    <div className="grid md:grid-cols-2 gap-8">

      {/* LEFT */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

        <h3 className="text-xl font-semibold mb-6">
          Shipping Details
        </h3>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black"
          />

        </div>

      </div>

      {/* RIGHT */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm h-fit">

        <h3 className="text-xl font-semibold mb-6">
          Order Summary
        </h3>

        <div className="space-y-4">

          {cart.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.title.slice(0, 20)}...
              </span>

              <span>
                x{item.quantity}
              </span>
            </div>
          ))}

        </div>

        <div className="border-t mt-6 pt-6">

          <div className="flex justify-between font-semibold text-lg">

            <span>Total</span>

            <span>
              ${getTotalPrice().toFixed(2)}
            </span>

          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default CheckoutPage;