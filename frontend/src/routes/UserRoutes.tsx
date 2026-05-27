import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


const UserRoutes = ({children}: any) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(!user) {
        return (
            <Navigate to="/login" replace />
        )
    }
    if(user.role === "admin"){
        return (
            <Navigate to="/admin/dashboard" replace />
        )
    }

    return children;
}

export default UserRoutes;