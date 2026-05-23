import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const AdminUsersPage = () => {
    const {users, setUsers, loading, fetchUsers} = useContext(UserContext);

    useEffect(()=> {
        fetchUsers()
    }, [])

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    return(

    <div className="w-full">

    {/* HEADER */}

    <div className="

    flex

    justify-between

    items-center

    mb-10

    ">

    <div>

    <h1 className="

    text-4xl

    font-bold

    ">

    Users

    </h1>


    <p className="

    text-gray-500

    mt-2

    ">

    Manage registered users

    </p>

    </div>



    <div className="

    bg-white

    border

    px-5

    py-3

    rounded-2xl

    text-sm

    text-gray-500

    ">

    Total Users

    <span className="

    font-semibold

    text-black

    ml-2

    ">

    {

    users.length

    }

    </span>

    </div>

    </div>



    {/* USERS */}

    <div className="

    bg-white

    rounded-3xl

    border

    overflow-hidden

    ">

    {/* TOP LABELS */}

    <div className="

    grid

    grid-cols-5

    px-8

    py-5

    border-b

    text-sm

    text-gray-500

    font-medium

    bg-gray-50

    ">

    <p>User</p>

    <p className="text-center">

    Joined

    </p>

    <p className="text-center">

    Role

    </p>

    <p className="text-center">

    Status

    </p>

    <p className="text-right">

    Actions

    </p>

    </div>



    {

    users.map(

    (user:any)=>(

    <div

    key={
    user._id
    }

    className="

    grid

    grid-cols-5

    items-center

    px-8

    py-6

    border-b

    hover:bg-gray-50

    transition

    "

    >

    {/* USER */}

    <div className="

    flex

    items-center

    gap-4

    ">

    <div className="

    w-12

    h-12

    rounded-full

    bg-black

    text-white

    flex

    items-center

    justify-center

    font-semibold

    text-lg

    ">

    {

    user.name

    .charAt(0)

    .toUpperCase()

    }

    </div>


    <div>

    <h2 className="

    font-semibold

    ">

    {

    user.name

    }

    </h2>


    <p className="

    text-sm

    text-gray-500

    ">

    {

    user.email

    }

    </p>

    </div>

    </div>



    {/* JOINED */}

    <div className="

    text-center

    ">

    <p className="font-medium">

    {

    new Date(

    user.createdAt

    )

    .toLocaleDateString()

    }

    </p>

    </div>



    {/* ROLE */}

    <div className="

    flex

    justify-center

    ">

    <span

    className={`

    px-4

    py-2

    rounded-full

    text-sm

    font-medium

    ${

    user.role==="admin"

    ?

    "bg-red-100 text-red-600"

    :

    "bg-gray-100 text-gray-700"

    }

    `}

    >

    {

    user.role

    }

    </span>

    </div>



    {/* STATUS */}

    <div className="

    flex

    justify-center

    ">

    <div className="

    flex

    items-center

    gap-2

    text-green-600

    font-medium

    text-sm

    ">

    <div className="

    w-2

    h-2

    rounded-full

    bg-green-500

    "></div>

    Active

    </div>

    </div>



    {/* ACTIONS */}

    <div className="

    flex

    justify-end

    gap-3

    ">

    <button

    className="

    px-4

    py-2

    bg-gray-100

    rounded-xl

    text-sm

    hover:bg-gray-200

    "

    >

    View

    </button>



    <button

    className="

    px-4

    py-2

    bg-blue-50

    text-blue-600

    rounded-xl

    text-sm

    hover:bg-blue-100

    "

    >

    Change Role

    </button>



    <button

    className="

    px-4

    py-2

    bg-red-50

    text-red-600

    rounded-xl

    text-sm

    hover:bg-red-100

    "

    >

    Delete

    </button>

    </div>

    </div>

    )

    )

    }

    </div>

    </div>

    )
}

export default AdminUsersPage;