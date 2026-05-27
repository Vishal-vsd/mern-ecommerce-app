import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AdminUserDetailPage = ({})=> {
    const {user, fetchUser, loading, handleDelete} = useContext(UserContext);
    const {id} = useParams()

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [role, setRole] = useState(user?.role);

    const changeRole = async()=> {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/users/${user._id}/role`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        role
                    })
                }
            )

            const data = await res.json();
            if(data.success) {
                toast.success("Role updated")
                fetchUser(user._id)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setShowRoleModal(false)
        }
    }

    useEffect(()=> {
        if(id){fetchUser(id)}
    },[id])

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="

        max-w-5xl

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

        User Details

        </h1>

        <p className="

        text-gray-500

        mt-2

        ">

        User #

        {

        user?._id

        .slice(-8)

        }

        </p>

        </div>


        <span className={`

        px-4

        py-2

        rounded-full

        text-sm

        font-medium

        ${

        user?.role==="admin"

        ?

        "bg-red-100 text-red-600"

        :

        "bg-gray-100 text-gray-700"

        }

        `}>

        {

        user?.role

        }

        </span>

        </div>



        {/* PROFILE CARD */}

        <div className="

        bg-white

        border

        rounded-3xl

        p-8

        ">

        <div className="

        flex

        items-center

        gap-5

        ">

        <div className="

        w-20

        h-20

        rounded-full

        bg-black

        text-white

        flex

        items-center

        justify-center

        text-3xl

        font-bold

        ">

        {

        user?.name

        ?.charAt(0)

        .toUpperCase()

        }

        </div>


        <div>

        <h2 className="

        text-2xl

        font-semibold

        ">

        {

        user?.name

        }

        </h2>


        <p className="

        text-gray-500

        ">

        {

        user?.email

        }

        </p>

        </div>

        </div>

        </div>



        {/* DETAILS */}

        <div className="

        grid

        md:grid-cols-2

        gap-6

        ">

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

        Role

        </p>

        <h2 className="

        font-semibold

        text-xl

        ">

        {

        user?.role

        }

        </h2>

        </div>



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

        Joined

        </p>

        <h2 className="

        font-semibold

        text-xl

        ">

        {

        new Date(

        user?.createdAt

        )

        .toLocaleDateString()

        }

        </h2>

        </div>

        </div>



        {/* ACTIONS */}

        <div className="

        flex

        gap-4

        flex-wrap

        ">

        <button 
        onClick={()=> setShowRoleModal(true)}
        className="

        px-5

        py-3

        rounded-xl

        bg-blue-50

        text-blue-600

        hover:bg-blue-100

        ">

        Change Role

        </button>


        <button 
        onClick={()=> handleDelete(user._id)}
        
        className="

        px-5

        py-3

        rounded-xl

        bg-red-50

        text-red-600

        hover:bg-red-100

        ">

        Delete User

        </button>

        </div>

        {
            showRoleModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl w-[400px] space-y-5">
                        <h2 className="text-2xl font-semibold">
                            Change Role
                        </h2>
                        <select value={role} onChange={(e)=> setRole(e.target.value)}
                            className="w-full border p-3 rounded-xl"
                            >
                                <option value="user">
                                    User
                                </option>
                                <option value="admin">Admin</option>
                        </select>
                        <div className="flex justify-end gap-3">
                            <button onClick={()=> setShowRoleModal(false)}
                                className="px-4 py-2 bg-gray-100 rounded-xl">
                                Cancel
                            </button>
                            <button onClick={changeRole}
                            className="px-5 py-2 bg-black text-white rounded-xl">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )
        }


        </div>
)
}

export default AdminUserDetailPage;