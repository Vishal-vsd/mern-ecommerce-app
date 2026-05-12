import {useState, useEffect} from "react";

type Order = {
    _id: string,

    products: {
        title: string,
        quantity: number,
        image: string
    }[],

    totalPrice: number,
    status: string,

    createdAt: string,
}

const MyOrdersPage = () => {
    const [ orders, setOrders ] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/orders/my-orders", 
                    {credentials: "include"},
                )
                const data = await res.json()

                if(data.success){
                    setOrders(data.orders);
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if(loading) {
        return (<p className="text-center mt-20">
            loading Orders...
        </p>)
    }

    if(orders.length === 0){
        return(
            <div className="text-center mt-20">
                <h2 className="text-2xl font-semibold">No orders yet</h2>
                <p className="text-gray-500 mt-2">Start shopping to place orders.</p>
            </div>
        )
    }
    return (
  <div className="max-w-5xl mx-auto px-6 py-10">

    <h2 className="text-3xl font-bold mb-8">
      My Orders
    </h2>

    <div className="space-y-6">

      {orders.map((order) => (

        <div
          key={order._id}
          className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
        >

          {/* TOP */}
          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <p className="font-medium">
                {order._id}
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="font-medium text-green-600">
                {order.status}
              </p>

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="space-y-4">

            {order.products.map(
              (product, index) => (

              <div
                key={index}
                className="flex items-center gap-4"
              >

                <img
                  src={product.image}
                  className="w-16 h-16 object-contain bg-gray-50 rounded-xl p-2"
                />

                <div className="flex-1">

                  <h3 className="text-sm font-medium text-gray-800">
                    {product.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Quantity: {product.quantity}
                  </p>

                </div>

              </div>
            ))}

          </div>

          {/* FOOTER */}
          <div className="border-t mt-6 pt-6 flex items-center justify-between">

            <p className="text-gray-500 text-sm">

              {new Date(
                order.createdAt
              ).toLocaleDateString()}

            </p>

            <p className="text-lg font-semibold">
              ${order.totalPrice}
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>
);
}

export default MyOrdersPage;