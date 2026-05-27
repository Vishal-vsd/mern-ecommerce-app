import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


const NonAdminRoutes = ({children}:any) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(user?.role === "admin"){
        return (
            <Navigate to="/admin/dashboard" replace />
        )
    }
    return children;
}

export default NonAdminRoutes;