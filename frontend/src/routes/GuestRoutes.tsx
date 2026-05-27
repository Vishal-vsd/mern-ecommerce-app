import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const GuestRoutes = ({children}:any) => {
    const {user, loading} = useContext(AuthContext);


    if(loading){
        return <div>
            Loading...
        </div>
    }

    if(user){
        return (
            <Navigate to={
                user.role==="admin"
                ? "/admin/dashboard"
                : "/"
            } replace/>
        )
    }

    return children;
}

export default GuestRoutes