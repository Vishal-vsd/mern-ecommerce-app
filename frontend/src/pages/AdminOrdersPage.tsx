import { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const AdminOrdersPage = ()=> {
    const {loading, orders, fetchOrders} = useContext(OrderContext);
    const navigate = useNavigate()
    

    useEffect(()=>{
        fetchOrders()
    }, [])

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }
return(

    <div className="

    w-full

    ">

    <h1 className="

    text-4xl

    font-bold

    mb-2

    ">

    Orders

    </h1>


    <p className="

    text-gray-500

    mb-10

    ">

    Manage customer orders

    </p>



    <div className="

    bg-white

    rounded-3xl

    border

    overflow-hidden

    ">

    {

    orders.map(

    (order:any)=>(

        <div

        key={
        order._id
        }

        className="

        flex

        justify-between

        items-center

        p-5

        border-b

        "

        >

        <div>

        <h2 className="font-semibold">

        Order #

        {

        order._id.slice(
        -6
        )

        }

        </h2>


        <p className="

        text-gray-500

        text-sm

        ">

        {

        order.user?.name

        }

        </p>


        <p className="

        text-gray-500

        text-sm

        ">

        ₹{

        order.totalPrice

        }

        </p>

        </div>



        <div className="

        flex

        items-center

        gap-4

        ">

        <p className="

        px-3

        py-1

        rounded-full

        text-sm

        bg-yellow-100

        text-yellow-700

        ">

        {

        order.status

        }

        </p>



        <button

        className="

        px-4

        py-2

        bg-gray-100

        rounded-lg

        hover:bg-gray-200

        "
        onClick={() => {
            console.log(order._id);
            navigate(
                `/admin/orders/${order._id}`
            )
        }

        }

        >

        View

        </button>

        </div>

        </div>

    ))

    }

    </div>

    </div>

)
}

export default AdminOrdersPage;