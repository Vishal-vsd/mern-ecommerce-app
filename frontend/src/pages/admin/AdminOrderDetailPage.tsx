import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import toast from "react-hot-toast";

const AdminOrderDetailPage = () => {
    const {id} = useParams();
    const {order, loading, fetchOrder} = useContext(OrderContext)
    const [status, setStatus] = useState("");

    useEffect(()=> {
        if(order){
            setStatus(order.status);
        }
    },[order]);

    useEffect(()=> {
        if(id){
            fetchOrder(id)
        }
    }, [id])

    const updateStatus = async() => {
        try {
            const res = await fetch(`http://localhost:3000/api/orders/status/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        status
                    })
                }
            )
            const data = await res.json();

            if(data.success){
                toast.success(
                    "Status udpated"
                )
                fetchOrder(id!)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (

        <div className="

        max-w-6xl

        mx-auto

        p-8

        space-y-8

        ">

        {/* TOP */}

        <div className="

        flex

        justify-between

        items-center

        ">

        <div>

        <h1 className="

        text-4xl

        font-bold

        ">

        Order Details

        </h1>

        <p className="

        text-gray-500

        mt-2

        ">

        Order #

        {

        order?._id.slice(-8)

        }

        </p>

        </div>


        <div>

        <span className="

        px-4

        py-2

        rounded-full

        text-sm

        font-medium

        bg-yellow-100

        text-yellow-700

        ">

        {

        order?.status

        }

        </span>

        </div>

        </div>



        {/* CUSTOMER */}

        <div className="

        bg-white

        border

        rounded-3xl

        p-6

        ">

        <h2 className="

        text-xl

        font-semibold

        mb-5

        ">

        Customer Info

        </h2>


        <div className="

        grid

        md:grid-cols-2

        gap-5

        ">

        <div>

        <p className="text-gray-500">

        Name

        </p>

        <p className="font-medium">

        {

        order?.shippingInfo.fullName

        }

        </p>

        </div>


        <div>

        <p className="text-gray-500">

        Phone

        </p>

        <p className="font-medium">

        {

        order?.shippingInfo.phone

        }

        </p>

        </div>


        <div>

        <p className="text-gray-500">

        Email

        </p>

        <p className="font-medium">

        {

        order?.user.email

        }

        </p>

        </div>


        <div>

        <p className="text-gray-500">

        City

        </p>

        <p className="font-medium">

        {

        order?.shippingInfo.city

        }

        </p>

        </div>

        </div>


        <div className="mt-5">

        <p className="text-gray-500">

        Address

        </p>

        <p className="font-medium">

        {

        order?.shippingInfo.address

        }

        </p>

        </div>

        </div>



        {/* PRODUCTS */}

        <div className="

        bg-white

        border

        rounded-3xl

        p-6

        ">

        <h2 className="

        text-xl

        font-semibold

        mb-5

        ">

        Products

        </h2>


        <div className="space-y-5">

        {

        order?.products.map(

        (product:any)=>(

        <div

        key={

        product.productId

        }

        className="

        flex

        justify-between

        items-center

        border-b

        pb-4

        "

        >

        <div className="

        flex

        items-center

        gap-4

        ">

        <img

        src={

        product.image

        }

        className="

        w-16

        h-16

        rounded-xl

        object-cover

        "

        />


        <div>

        <p className="

        font-medium

        ">

        {

        product.title

        }

        </p>


        <p className="

        text-sm

        text-gray-500

        ">

        Qty:

        {

        product.quantity

        }

        </p>

        </div>

        </div>



        <div>

        <p className="font-semibold">

        ₹{

        product.finalPrice

        *

        product.quantity

        }

        </p>

        </div>


        </div>

        )

        )

        }

        </div>

        </div>



        {/* SUMMARY */}

        <div className="

        grid

        md:grid-cols-3

        gap-6

        ">

        {/* CREATED */}

        <div className="

        bg-white

        border

        rounded-3xl

        p-6

        ">

        <p className="

        text-gray-500

        mb-2

        ">

        Created

        </p>

        <h2 className="

        font-semibold

        text-lg

        ">

        {

        new Date(

        order?.createdAt

        )

        .toLocaleDateString()

        }

        </h2>

        </div>



        {/* TOTAL */}

        <div className="

        bg-black

        text-white

        rounded-3xl

        p-6

        ">

        <p className="

        text-gray-300

        mb-2

        ">

        Total Amount

        </p>

        <h2 className="

        text-4xl

        font-bold

        ">

        ₹{

        order?.totalPrice

        }

        </h2>

        </div>



        {/* STATUS */}

        <div className="

        bg-white

        border

        rounded-3xl

        p-6

        ">

        <h2 className="

        font-semibold

        mb-4

        ">

        Update Status

        </h2>


        <div className="

        flex

        flex-col

        gap-3

        ">

        <select

        value={
        status
        }

        onChange={(e)=>

        setStatus(

        e.target.value

        )

        }

        className="

        border

        p-3

        rounded-xl

        "

        >

        <option value="Processing">

        Processing

        </option>


        <option value="Shipped">

        Shipped

        </option>


        <option value="Delivered">

        Delivered

        </option>

        </select>



        <button

        onClick={
        updateStatus
        }

        className="

        bg-black

        text-white

        p-3

        rounded-xl

        hover:bg-gray-800

        "

        >

        Update Status

        </button>

        </div>

        </div>

        </div>

        </div>

    )
}

export default AdminOrderDetailPage;