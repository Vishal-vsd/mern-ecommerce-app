import {
Outlet
}
from
"react-router-dom";

import AdminSidebar
from
"../components/AdminSidebar";

const AdminLayout =
()=>{

return(

<div className="
min-h-screen
flex
bg-[#f8fafc]">

<AdminSidebar/>

<div className="
flex-1
p-10">

<Outlet/>

</div>

</div>

)

}

export default
AdminLayout;