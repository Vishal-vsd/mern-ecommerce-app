
import {
    Package,
    ShoppingBag,
    Users
}
from "lucide-react";

import { useState, useEffect } from "react";

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0
    })

    const fetchStats = async() => {
        try {
            const res = await fetch("http://localhost:3000/api/admin/stats",
                {
                    credentials: "include"
                }
            )

            const data = await res.json();

            if(data.success){
                setStats(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        fetchStats()
    },[])

return (

<div className="

min-h-screen

bg-[#f8fafc]

px-12

py-10

">

{/* HEADER */}

<div>

<h1 className="
text-5xl
font-bold
tracking-tight
">

Welcome Admin 👋

</h1>

<p className="
text-gray-500

mt-3

text-lg
">

Manage products,
orders and users

</p>

</div>



{/* STATS */}

<div className="

grid

md:grid-cols-3

gap-7

mt-12

">

{/* PRODUCTS */}

<div className="

bg-white

rounded-3xl

border

border-gray-100

p-8

shadow-sm

hover:shadow-md

transition

">

<div className="
flex
justify-between
items-center">

<h3 className="
text-gray-500">

Total Products

</h3>

<Package
size={22}
className="
text-gray-400"
/>

</div>


<p className="
text-5xl

font-bold

mt-6
">

{
    stats.products
}

</p>

</div>



{/* ORDERS */}

<div className="

bg-white

rounded-3xl

border

border-gray-100

p-8

shadow-sm

hover:shadow-md

transition

">

<div className="
flex
justify-between
items-center">

<h3 className="
text-gray-500">

Orders

</h3>

<ShoppingBag
size={22}
className="
text-gray-400"
/>

</div>


<p className="
text-5xl

font-bold

mt-6
">

{
    stats.orders
}

</p>

</div>



{/* USERS */}

<div className="

bg-white

rounded-3xl

border

border-gray-100

p-8

shadow-sm

hover:shadow-md

transition

">

<div className="
flex
justify-between
items-center">

<h3 className="
text-gray-500">

Users

</h3>

<Users
size={22}
className="
text-gray-400"
/>

</div>


<p className="
text-5xl

font-bold

mt-6
">

{
    stats.users
}

</p>

</div>

</div>



{/* RECENT ACTIVITY */}

<div className="

bg-white

rounded-3xl

border

border-gray-100

p-8

shadow-sm

mt-10

">

<h2 className="
text-2xl
font-semibold
mb-6">

Recent Activity

</h2>


<p className="
text-gray-500">

No recent activity yet.

</p>

</div>


</div>

)

}

export default
AdminDashboard;