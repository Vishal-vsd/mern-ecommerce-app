import {
    LogOut,
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users
} from "lucide-react";

import { Link }
from "react-router-dom";

const AdminSidebar = () => {

return (

<div className="

w-72
h-screen

bg-white

border-r

border-gray-200

flex

flex-col

justify-between

px-7

py-8

sticky

top-0

">

{/* TOP */}

<div>

<div className="mb-14">

<h1 className="
text-3xl
font-bold
tracking-tight
">

MyStore

</h1>

<p className="
text-gray-500
text-sm
mt-1
">

Admin Dashboard

</p>

</div>



<div className="
flex
flex-col
gap-2">

<Link

to="/admin/dashboard"

className="

flex

items-center

gap-3

px-4

py-3

rounded-xl

text-gray-700

hover:bg-gray-100

hover:text-black

transition

">

<LayoutDashboard
size={18}
/>

Dashboard

</Link>



<Link

to="/admin/products"

className="

flex

items-center

gap-3

px-4

py-3

rounded-xl

text-gray-700

hover:bg-gray-100

transition

">

<Package
size={18}
/>

Products

</Link>



<Link

to="/admin/orders"

className="

flex

items-center

gap-3

px-4

py-3

rounded-xl

text-gray-700

hover:bg-gray-100

transition

">

<ShoppingBag
size={18}
/>

Orders

</Link>



<Link

to="/admin/users"

className="

flex

items-center

gap-3

px-4

py-3

rounded-xl

text-gray-700

hover:bg-gray-100

transition

">

<Users
size={18}
/>

Users

</Link>

</div>

</div>



{/* BOTTOM */}

<button className="

flex

items-center

gap-3

px-4

py-3

rounded-xl

text-gray-600

hover:bg-red-50

hover:text-red-500

transition

">

<LogOut
size={18}
/>

Logout

</button>


</div>

)

}

export default
AdminSidebar;