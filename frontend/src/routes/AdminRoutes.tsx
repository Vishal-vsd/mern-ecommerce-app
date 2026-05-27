import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AdminRoutes = ({children}: any)=> {
    const {user, loading} = useContext(AuthContext)
    // const pathname = useLocation()

    // const isUserLoggedIn = user

    if(loading){
        return (<div>
            Loading...
        </div>)
    }

    else if(!user) {
        return (
            <Navigate to="/login" replace/>
        )
    }
    else if (user.role !== "admin") {
        return (
            <Navigate to="/login" replace/>
        )
    }

    return children;
}

export default AdminRoutes;