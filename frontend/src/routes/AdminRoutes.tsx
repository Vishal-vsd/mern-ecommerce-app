import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoutes = ({children}: any)=> {
    const {user, loading} = useContext(AuthContext)
    const navigate = useNavigate()

    if(loading){
        return (<div>
            Loading...
        </div>)
    }

    if(!user) {
        return (
            navigate("/login")
        )
    }
    if(user.role !== "admin") {
        return (
            navigate(
                "/"
            )
        )
    }

    return children;
}

export default AdminRoutes;